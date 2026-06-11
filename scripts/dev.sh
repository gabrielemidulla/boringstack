#!/usr/bin/env sh
set -eu

docker compose up mariadb -d
pnpm run dev
