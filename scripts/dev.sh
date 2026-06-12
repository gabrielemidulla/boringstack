#!/usr/bin/env sh
set -eu

docker compose up mariadb -d
vp run dev
