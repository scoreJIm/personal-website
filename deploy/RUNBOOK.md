# Weekend Deploy Runbook — all 3 projects + site on t3.small + RDS

Sequential checklist. Every step is yours to run (AWS console / SSH / Cloudflare);
I've pre-wired the config so the box side is just `pull` + `up`.

## 0. Pre-flight (already done)

- ✅ 4 images published to GHCR `ghcr.io/scorejim/*:latest`
  (personal-website, neopick, agentsaul, ai-assistant)
- ✅ `deploy/docker-compose.yml` sized for 2 GB (JVM heap caps + mem limits)
- ✅ Domain `jimmyweidev.com` already in Cloudflare

You need in hand: AWS console access, SSH key, Cloudflare login, and the real
secrets (DB passwords, JWT secret, DashScope `AI_API_KEY`).

## 1. RDS PostgreSQL (~$14/mo)

1. RDS → Create database → **PostgreSQL 16**, **db.t4g.micro**, single-AZ,
   storage **gp3 20 GB** (min). Public access **off**.
2. Master user/password — write these down; they go into `.env` later.
3. Security group: allow **5432 from the EC2 security group** only.
4. After it's `Available`, create the three databases (psql or a quick SQL tool):
   ```sql
   CREATE DATABASE neopick;
   CREATE DATABASE agent_saul;
   CREATE DATABASE ai_assistant;
   ```
5. On `ai_assistant` only, enable pgvector (ships with RDS PG 14+):
   ```sql
   \c ai_assistant
   CREATE EXTENSION vector;
   ```
6. Note the **endpoint** (e.g. `neopick.xxxx.eu-central-1.rds.amazonaws.com:5432`).

## 2. EC2 — get to t3.small

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

## 3. Cloudflare — DNS + cert

1. **DNS**: 5 proxied (orange-cloud) A records → the Elastic IP:
   `@`, `www`, `neo`, `agent`, `assistant`.
2. **Cert**: SSL/TLS → Origin Server → Create Certificate, hostnames
   `jimmyweidev.com` + `*.jimmyweidev.com`, 15 years. Copy the two blobs.
3. **SSL mode**: Overview → **Full (Strict)**.

## 4. Put files on the box

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

`.env` contents (fill real values):

```ini
# NeoPick
NEOPICK_DB_URL=jdbc:postgresql://<RDS_ENDPOINT>:5432/neopick
NEOPICK_DB_USER=<master_user>
NEOPICK_DB_PASSWORD=<password>
NEOPICK_JWT_SECRET=<long random string>

# AgentSaul
AGENTSAUL_DB_URL=jdbc:postgresql://<RDS_ENDPOINT>:5432/agent_saul
AGENTSAUL_DB_USER=<master_user>
AGENTSAUL_DB_PASSWORD=<password>
AGENTSAUL_REDIS_PASSWORD=

# AI (both apps + assistant)
AI_API_KEY=<dashscope key>
AI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode
AI_MODEL=qwen3-vl-32b-thinking

# AI Assistant
ASSISTANT_DB_URL=postgresql://<master_user>:<password>@<RDS_ENDPOINT>:5432/ai_assistant
```

## 5. Launch

```bash
docker compose pull
docker compose up -d
docker compose ps            # all 6 services Up
```

## 6. Smoke test

```bash
docker compose logs -f neopick agentsaul assistant   # watch for startup errors / OOM
docker stats --no-stream                              # real RSS per container

curl -I https://jimmyweidev.com            # 200
curl -I https://neo.jimmyweidev.com        # 200 (or 401 if auth-gated)
curl -I https://agent.jimmyweidev.com      # 200
curl -I https://assistant.jimmyweidev.com  # 200
```

## 7. OOM watch

- `docker stats` — if a JVM sits near its `mem_limit` (512m) or any container
  shows `OOMKilled`, the lever is in `deploy/docker-compose.yml`:
  `JAVA_TOOL_OPTIONS` (`-Xmx` in 64m steps) or `mem_limit`.
- If the *host* `free -h` shows swap filling and it still OOMs, the honest fix
  is `t3.medium` — do **not** uncap the JVMs, they will take the box down.

## Gotchas

- **Stop/start changes the IP** → use the Elastic IP everywhere, or update DNS.
- **RDS is not free-tier** (~$14/mo). Confirm you're OK with that before step 1.
- **SSE/WebSocket** already handled in `nginx.conf` (buffering off, long
  timeouts) — don't add a CDN cache in front of `agent`/`assistant`.
