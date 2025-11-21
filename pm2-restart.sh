#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "♻️  PM2 리로드..."
pm2 reload nextjs-app || pm2 start ecosystem.config.js
pm2 save

echo "✅ 완료. 상태 확인: pm2 status"

