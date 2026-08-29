# Unified AWS + Cloudflare Deployment

Single-EC2 deployment for the whole portfolio — the website plus the three
projects — behind Cloudflare. PostgreSQL runs in a container on the box; there is
no managed database (no RDS), keeping cost to a single EC2 instance.

## Architecture

```
GitHub Actions (build + test) → GHCR (ghcr.io/scorejim/*)
        │
        │  docker compose pull
        ▼
Cloudflare (DNS + CDN + SSL + proxy)
        │ HTTPS (443)
        ▼
EC2 t3.small ── nginx reverse proxy (route by Host)
        │
        ├── jimmyweidev.com          → portfolio   (static site, :80)
        ├── neo.jimmyweidev.com      → NeoPick     (Spring Boot, :8080)
        ├── agent.jimmyweidev.com    → AgentSaul   (Spring AI,  :8080)
        └── rag.jimmyweidev.com      → AI Assistant (FastAPI, :8000)
        │
        ▼
PostgreSQL (Docker, 3 databases, pgvector) + S3 (media) + Redis (container)
```

## Why this shape

| Decision | Choice | Why |
|----------|--------|-----|
| Compute | **1 × EC2 `t3.small` (2 vCPU / 2 GB)** + Docker Compose | runs 2 JVMs + FastAPI + PostgreSQL + Redis + nginx in containers. **Works only with JVM heap caps + mem limits + host swap** (see "Memory on t3.small") — untuned it OOMs |
| Database | **PostgreSQL in Docker** (`pgvector/pgvector:pg16`), 3 DBs | one container, no RDS cost; pgvector for the assistant |
| Cache | Redis in a container (**not ElastiCache**) | ElastiCache min ~$12/mo, not worth it for a portfolio |
| Image build | **GitHub Actions → GHCR** (not build-on-box) | Maven builds spike 1–1.5 GB; building two JVMs on the box OOMs it |
| CDN / SSL / DNS | Cloudflare (free) | free SSL, hides the origin IP, DDoS |
| Secrets | gitignored `.env` on the box | free, keeps keys out of the repo |
| **No** | RDS / NAT Gateway / ALB / EKS / ElastiCache / Lambda / ECS | each adds $10–40/mo with no benefit here |

**Monthly cost ≈ $15** (EC2 `t3.small` ~$15); S3/Cloudflare/GHCR ≈ $0.

## Memory on t3.small

`t3.small` = 2 GB. This is the *floor*, not headroom — the stack only fits
because of deliberate moves already baked into `docker-compose.yml`:

| Lever | Value | Effect |
|-------|-------|--------|
| JVM heap cap | `-Xmx256m -XX:MaxMetaspaceSize=160m` per app | each Spring Boot JVM stays ~450 MB max instead of ~750 MB+ |
| Container `mem_limit` | 512m / 512m / 256m / 256m / 64m / 32m / 32m | one container can't eat the whole box |
| Redis `maxmemory` | 32mb allkeys-lru | Redis never grows past 32 MB |

Budget: 2 JVMs (1024m) + assistant (256m) + postgres (256m) + redis (64m) +
2 nginx (64m) ≈ **1.66 GB** + OS/Docker (~300m) ≈ **1.96 GB**, thin margin.
**Add 2 GB swap** so a GC spike or image pull doesn't OOM-kill a container:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

If a JVM still gets OOM-killed at startup, the lever is `JAVA_TOOL_OPTIONS`
in `docker-compose.yml`: raise `-Xmx` in 64m steps (max ~320m before it stops
fitting) — or accept that the honest fix is a `t3.medium`. Do **not** leave
the JVMs uncapped: they *will* consume everything and take the box down.

## Subdomains (Cloudflare DNS → proxied A records → EC2 IP)

| Host | Routes to |
|------|-----------|
| `jimmyweidev.com` / `www` | portfolio |
| `neo.jimmyweidev.com` | NeoPick |
| `agent.jimmyweidev.com` | AgentSaul |
| `rag.jimmyweidev.com` | AI Assistant |

One Cloudflare **Origin CA** certificate covering `jimmyweidev.com` +
`*.jimmyweidev.com` serves every subdomain.

## Deploy steps

### One-time provisioning

1. **EC2**: `t3.small` (Ubuntu 24.04; security group allows 80/443 from
   Cloudflare IP ranges, SSH 22 from your IP only). Then **enable a swap file** —
   see "Memory on t3.small".
2. **Database**: no action — the compose file starts `pgvector/pgvector:pg16` and
   creates `neopick` / `agentsaul` / `ai_assistant` (plus pgvector) from
   `pg-init.sql` on first start.
3. **S3**: one bucket for NeoPick media (e.g. `neopick-prod-media`).
4. **Secrets**: LLM key / DB password / JWT secret in a gitignored `.env` next to
   this `deploy/` dir.
5. **Cert**: drop the Origin CA `.pem` / `.key` into `deploy/certs/`.

### Routine deploy

```bash
cd deploy
docker compose pull          # images come from GHCR (built by GitHub Actions)
docker compose up -d
```

### Cloudflare

Add the 5 proxied A records (table above) and set SSL mode **Full (Strict)**.

## Notes

- **Images are built in CI, not on the box.** Each repo has a `.github/workflows/publish.yml`
  that builds and pushes `ghcr.io/scorejim/<repo>:latest` on every push to its
  default branch. Keep the GHCR packages **public** (the default for public
  repos) so the EC2 can `pull` anonymously.
- The reverse proxy terminates TLS and speaks plain HTTP to each container, so
  every project image must expose plain HTTP (no per-project TLS). The
  `portfolio` image ships with its standalone TLS `nginx.conf`; this compose
  overrides it with `portfolio.conf` (plain HTTP) via a bind mount.
- SSE (AgentSaul, assistant) needs `proxy_buffering off` + a long
  `proxy_read_timeout` — already in `nginx.conf`.
- NeoPick's WebSocket (STOMP) needs `Upgrade` / `Connection` headers — already
  in `nginx.conf`.
- **Redis is plaintext** (container, not exposed publicly): NeoPick prod reads
  `REDIS_SSL=false` (default).
- **PostgreSQL is not exposed publicly** — it has no `ports:` mapping, so it's
  reachable only from the other containers on the compose network.
- **OTLP is disabled in prod** for both Java apps (no otel-collector in this
  stack); Prometheus metrics remain on `/actuator/prometheus` for debugging.
