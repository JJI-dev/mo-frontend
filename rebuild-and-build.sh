#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🧹 클린업: node_modules, .next"
rm -rf node_modules .next

echo "📦 재설치 (npm ci가 가능하면 사용)"
if [ -f package-lock.json ]; then
  npm ci || npm install
else
  npm install
end

echo "⬆️ Node 메모리 한도 상향(임시)"
export NODE_OPTIONS="--max-old-space-size=2048"

echo "🔨 빌드 실행"
npm run build

echo "✅ 완료"

