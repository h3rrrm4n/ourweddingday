#!/usr/bin/env bash
set -euo pipefail

SERVER="herman@173.249.16.78"
REMOTE_DIR="/var/www/ourweddingday"
LOCAL_DIR="$(cd "$(dirname "$0")" && pwd)"
STAGING="/tmp/ourweddingday-deploy"

build_ssh() {
  if [[ -n "${SSH_PRIVATE_KEY:-}" ]]; then
    SSH_KEY_FILE="$(mktemp)"
    trap 'rm -f "$SSH_KEY_FILE"' EXIT
    printf '%s\n' "$SSH_PRIVATE_KEY" > "$SSH_KEY_FILE"
    chmod 600 "$SSH_KEY_FILE"
  elif [[ -f "${SSH_KEY_FILE:-$HOME/.ssh/deploy_key}" ]]; then
    SSH_KEY_FILE="${SSH_KEY_FILE:-$HOME/.ssh/deploy_key}"
  else
    echo "Set SSH_PRIVATE_KEY or SSH_KEY_FILE to deploy." >&2
    exit 1
  fi

  SSH_BASE=(ssh -i "$SSH_KEY_FILE" -o StrictHostKeyChecking=no)
  RSYNC_SSH="ssh -i $SSH_KEY_FILE -o StrictHostKeyChecking=no"
}

build_ssh

echo "Deploying wedding site to $SERVER:$REMOTE_DIR"

"${SSH_BASE[@]}" "$SERVER" "rm -rf '$STAGING' && mkdir -p '$STAGING/assets'"

rsync -avz -e "$RSYNC_SSH" \
  "$LOCAL_DIR/index.html" \
  "$SERVER:$STAGING/"

rsync -avz -e "$RSYNC_SSH" \
  "$LOCAL_DIR/assets/" \
  "$SERVER:$STAGING/assets/"

"${SSH_BASE[@]}" "$SERVER" bash -s <<'REMOTE'
set -euo pipefail
STAGING="/tmp/ourweddingday-deploy"
TARGET="/var/www/ourweddingday"

sudo_cmd() {
  if sudo -n true 2>/dev/null; then
    sudo "$@"
  elif [[ -n "${herman pass:-}" ]]; then
    echo "${herman pass}" | sudo -S "$@"
  else
    sudo "$@"
  fi
}

sudo_cmd rsync -a --delete "$STAGING/" "$TARGET/"
sudo_cmd rm -rf "$STAGING"
sudo_cmd chown -R www-data:www-data "$TARGET"
sudo_cmd find "$TARGET" -type f -exec chmod 644 {} \;
sudo_cmd find "$TARGET" -type d -exec chmod 755 {} \;
sudo_cmd nginx -t
sudo_cmd systemctl reload nginx
echo "Deploy complete: https://ourweddingday.am"
REMOTE
