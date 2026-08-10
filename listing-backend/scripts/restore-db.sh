#!/bin/sh
set -eu

if [ "${CONFIRM_RESTORE:-}" != "yes" ]; then
  echo "Set CONFIRM_RESTORE=yes after stopping the listing-api service." >&2
  exit 1
fi

backup_file="${1:-}"
db_path="${LISTING_DB_PATH:-/app/data/listings.sqlite}"
backup_dir="${LISTING_BACKUP_DIR:-/app/backups}"

if [ -z "$backup_file" ] || [ ! -f "$backup_file" ]; then
  echo "Usage: restore-db.sh /app/backups/listings-TIMESTAMP.sqlite" >&2
  exit 1
fi

if [ -f "$backup_file.sha256" ]; then
  (cd "$(dirname "$backup_file")" && sha256sum -c "$(basename "$backup_file.sha256")")
fi
sqlite3 "$backup_file" "PRAGMA integrity_check;" | grep -qx "ok"
rm -f "$backup_file-shm" "$backup_file-wal"
mkdir -p "$(dirname "$db_path")"
mkdir -p "$backup_dir"
if [ -f "$db_path" ]; then
  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  safety_copy="$backup_dir/pre-restore-$timestamp.sqlite"
  sqlite3 "$db_path" ".timeout 10000" ".backup '$safety_copy'"
  test "$(sqlite3 "$safety_copy" "PRAGMA journal_mode=DELETE; PRAGMA integrity_check;" | tail -n 1)" = "ok"
  rm -f "$safety_copy-shm" "$safety_copy-wal"
  (cd "$backup_dir" && sha256sum "$(basename "$safety_copy")" > "$(basename "$safety_copy").sha256")
fi
cp "$backup_file" "$db_path.restore"
mv "$db_path.restore" "$db_path"
rm -f "$db_path-shm" "$db_path-wal"
echo "Restored $db_path from $backup_file"
