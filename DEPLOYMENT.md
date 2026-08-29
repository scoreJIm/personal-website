# Deployment

The portfolio site is a static React app served by **nginx over HTTPS**, fronted by Cloudflare.

```
Cloudflare (DNS + proxy + edge TLS)
        ↓ HTTPS (443)
EC2 nginx (Docker)  ← cert: Cloudflare Origin CA
        ↓
Static files (Vite build)
```

- Domain: `jimmyweidev.com` (Cloudflare)
- Compute: single EC2 instance running Docker
- TLS: Cloudflare **Origin CA** certificate on nginx; Cloudflare SSL mode **Full (Strict)**

## One-time setup

### 1. Generate an Origin CA certificate

Cloudflare dashboard → `jimmyweidev.com` → **SSL/TLS** → **Origin Server** → **Create Certificate**:

- Hostnames: `jimmyweidev.com` and `*.jimmyweidev.com`
- Validity: 15 years (default)

Copy the two outputs onto the server (do **not** commit them — `certs/` is gitignored):

```bash
mkdir -p certs
nano certs/jimmyweidev.com.pem   # paste the "Origin Certificate" (PEM)
nano certs/jimmyweidev.com.key   # paste the "Private Key"
```

### 2. Point DNS to the server

Cloudflare → **DNS** → two proxied A records:

| Type | Name | Content          | Proxy           |
|------|------|------------------|-----------------|
| A    | `@`  | `32.236.114.146` | Proxied (orange) |
| A    | `www`| `32.236.114.146` | Proxied (orange) |

### 3. Build and run

```bash
docker compose up -d --build
```

### 4. Set Cloudflare SSL mode

Cloudflare → **SSL/TLS** → **Overview** → encryption mode → **Full (Strict)**.

### 5. Verify

```bash
curl -I https://jimmyweidev.com         # expect HTTP/2 200
curl -I http://jimmyweidev.com          # expect 301 -> https://jimmyweidev.com
curl -I https://www.jimmyweidev.com     # expect 301 -> https://jimmyweidev.com
```

## Redeploy after code changes

```bash
git pull
docker compose up -d --build
```

## Files

- `nginx.conf` — HTTPS server blocks: 80→443 redirect, www→apex, SPA fallback, asset caching
- `Dockerfile` — multi-stage (Vite build → nginx:alpine)
- `docker-compose.yml` — ports 80/443 + read-only cert mount
