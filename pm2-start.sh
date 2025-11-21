#!/bin/bash
set -e

# 프로젝트 루트로 이동
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🔨 빌드 시작..."
if [ ! -d node_modules ]; then
  echo "📦 node_modules 없음 → npm install 수행"
  if [ -f package-lock.json ]; then
    npm ci || npm install
  else
    npm install
  fi
fi

npm run build

echo "🗂️  로그 디렉토리 생성..."
mkdir -p logs

echo "🚀 PM2 시작 (ecosystem.config.js)..."
pm2 start ecosystem.config.js
pm2 save

echo "✅ 완료. 상태 확인: pm2 status"

