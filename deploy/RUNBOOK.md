# Deploy Runbook — 3 projects + site on one t3.small (PostgreSQL in Docker)

Sequential checklist. Every step is yours to run (AWS console / SSH / Cloudflare);
the box side is already wired so it's just `pull` + `up`.

## 0. Pre-flight (already done)

- ✅ Images published to GHCR `ghcr.io/scorejim/*:latest`
- ✅ `deploy/docker-compose.yml` sized for 2 GB (JVM heap caps + mem limits + PostgreSQL in Docker)
- ✅ Domain `jimmyweidev.com` already in Cloudflare
- ✅ `deploy/pg-init.sql` creates the 3 databases on first start

You need in hand: AWS console access, SSH key, Cloudflare login, and two secrets —
a DB password and the DashScope `AI_API_KEY`.

## 1. EC2 — get to t3.small

You have a running box (`32.236.114.146`) — likely `t2.micro` (1 GB). To move to
`t3.small` (2 GB):

1. **Attach an Elastic IP first** (EC2 → Elastic IPs → Allocate → Associate to
   the instance). Free while attached to a *running* instance. This matters:
   changing instance type = stop/start, and stop/start **changes the public IP**
   unless it's an Elastic IP. If the IP changes, update Cloudflare A records.
2. Stop instance → Actions → Instance settings → Change instance type →
   **t3.small** → Start.
3. SSH in and enable swap (needed — see `README.md` "Memory on t3.small"):
   ```bash
   sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
   sudo mkswap /swapfile && sudo swapon /swapfile
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   ```
4. Confirm Docker + Compose v2 are installed (`docker --version`, `docker compose version`).

## 2. Cloudflare — DNS + cert

1. **DNS**: 5 proxied (orange-cloud) A records → the Elastic IP:
   `@`, `www`, `neo`, `agent`, `rag`.
2. **Cert**: SSL/TLS → Origin Server → Create Certificate, hostnames
   `jimmyweidev.com` + `*.jimmyweidev.com`, 15 years. Copy the two blobs.
3. **SSL mode**: Overview → **Full (Strict)**.

## 3. Put files on the box

```bash
# from your laptop (this repo)
scp -r deploy ubuntu@<ELASTIC_IP>:~/deploy
ssh ubuntu@<ELASTIC_IP>
cd ~/deploy

# certs (gitignored — never commit these)
mkdir -p certs
nano certs/jimmyweidev.com.pem    # paste "Origin Certificate"
nano certs/jimmyweidev.com.key    # paste "Private Key"

# secrets (gitignored — never commit this)
nano .env
```

`.env` contents (fill real values — `DB_PASSWORD` must be URL-safe, no `@ : /`):

```ini
# Database (one shared postgres container; also used in the assistant's DATABASE_URL)
DB_PASSWORD=<a password, no @ : / characters>

# NeoPick
NEOPICK_JWT_SECRET=<long random string>

# AI (AgentSaul + assistant)
AI_API_KEY=<dashscope key>
```

## 4. Launch

```bash
docker compose pull
docker compose up -d
docker compose ps            # all 7 services Up (proxy, portfolio, postgres, redis, neopick, agentsaul, assistant)
```

## 5. Smoke test

```bash
docker compose logs -f neopick agentsaul assistant   # watch for startup errors / OOM
docker stats --no-stream                              # real RSS per container

curl -I https://jimmyweidev.com            # 200
curl -I https://neo.jimmyweidev.com        # 200 (or 401 if auth-gated)
curl -I https://agent.jimmyweidev.com      # 200
curl -I https://rag.jimmyweidev.com        # 200
```

## 6. OOM watch

- `docker stats` — if a JVM sits near its `mem_limit` (512m) or any container
  shows `OOMKilled`, the lever is in `deploy/docker-compose.yml`:
  `JAVA_TOOL_OPTIONS` (`-Xmx` in 64m steps) or `mem_limit`.
- If the *host* `free -h` shows swap filling and it still OOMs, the honest fix
  is `t3.medium` — do **not** uncap the JVMs, they will take the box down.

## Gotchas

- **Stop/start changes the IP** → use the Elastic IP everywhere, or update DNS.
- **`pg-init.sql` runs only once** (when the data volume is first created). If
  you need to re-create the databases, `docker compose down -v` then `up -d`.
- **SSE/WebSocket** already handled in `nginx.conf` (buffering off, long
  timeouts) — don't add a CDN cache in front of `agent`/`rag`.
