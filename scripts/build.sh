#!/usr/bin/env sh
set -eu

docker compose build --no-cache api web
docker compose up -d