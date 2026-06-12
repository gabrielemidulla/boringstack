#!/usr/bin/env sh
set -eu

docker compose build
docker compose up -d