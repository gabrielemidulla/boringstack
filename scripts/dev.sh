sudo docker compose stop api web 2>/dev/null || true
sudo docker compose rm -f mariadb 2>/dev/null || true
sudo docker compose up mariadb -d --force-recreate
pnpm run dev