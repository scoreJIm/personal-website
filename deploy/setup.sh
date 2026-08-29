#!/usr/bin/env bash
# One-shot setup for the single-EC2 portfolio deploy.
#
# Usage (on the EC2 box, after copying the deploy/ directory onto it):
#   scp -r deploy ubuntu@<IP>:~/
#   ssh ubuntu@<IP>
#   cd ~/deploy
#   # put your Cloudflare Origin CA certs in certs/ first, then:
#   sudo ./setup.sh
#
# The script: installs Docker if missing, enables a 2 GB swap file, creates the
# gitignored .env (prompts for secrets), then pulls and starts every container.

set -euo pipefail

log() { printf '\033[1;34m==>\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m!!\033[0m %s\n' "$*" >&2; exit 1; }

log "Checking Docker..."
if ! command -v docker >/dev/null 2>&1; then
  log "Docker not found — installing via get.docker.com"
  curl -fsSL https://get.docker.com | sh
fi
docker compose version >/dev/null 2>&1 || die "docker compose plugin missing"

log "Enabling 2 GB swap..."
if swapon --show 2>/dev/null | grep -q swapfile; then
  log "swap already enabled"
else
  if command -v fallocate >/dev/null 2>&1; then
    fallocate -l 2G /swapfile
  else
    dd if=/dev/zero of=/swapfile bs=1M count=2048
  fi
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  log "swap enabled (2 GB)"
fi

cd "$(dirname "$0")"

log "Checking TLS certs..."
[ -f certs/jimmyweidev.com.pem ] && [ -f certs/jimmyweidev.com.key ] \
  || die "certs/jimmyweidev.com.pem and .key missing — drop the Cloudflare Origin CA files there first"

if [ ! -f .env ]; then
  log "Creating .env (prompts for secrets — DB_PASSWORD must be URL-safe: no @ : /)"
  read -rsp "DB_PASSWORD: " DB_PASSWORD; echo
  read -rsp "DashScope AI_API_KEY: " AI_API_KEY; echo
  read -rsp "NeoPick JWT secret (blank = generate): " JWT; echo
  [ -n "$JWT" ] || JWT=$(openssl rand -hex 32)
  umask 077
  cat > .env <<EOF
DB_PASSWORD=$DB_PASSWORD
NEOPICK_JWT_SECRET=$JWT
AI_API_KEY=$AI_API_KEY
EOF
  log ".env written"
fi

log "Pulling images and starting..."
docker compose pull
docker compose up -d

log "Waiting for services to become healthy..."
sleep 15
docker compose ps
