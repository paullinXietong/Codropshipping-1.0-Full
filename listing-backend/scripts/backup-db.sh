#!/bin/sh
set -eu

db_path="${LISTING_DB_PATH:-/app/data/listings.sqlite}"
backup_dir="${LISTING_BACKUP_DIR:-/app/backups}"
retention_days="${LISTING_BACKUP_RETENTION_DAYS:-14}"

if [ ! -f "$db_path" ]; then
  echo "Listing database not found: $db_path" >&2
  exit 1
fi

mkdir -p "$backup_dir"
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
backup_file="$backup_dir/listings-$timestamp.sqlite"

sqlite3 "$db_path" ".timeout 10000" ".backup '$backup_file'"
test "$(sqlite3 "$backup_file" "PRAGMA journal_mode=DELETE; PRAGMA integrity_check;" | tail -n 1)" = "ok"
rm -f "$backup_file-shm" "$backup_file-wal"
(cd "$backup_dir" && sha256sum "$(basename "$backup_file")" > "$(basename "$backup_file").sha256")

find "$backup_dir" -type f \( -name 'listings-*.sqlite' -o -name 'listings-*.sqlite.sha256' -o -name 'pre-restore-*.sqlite' -o -name 'pre-restore-*.sqlite.sha256' \) -mtime "+$retention_days" -delete
echo "$backup_file"
