#!/bin/bash
set -e

echo "🛑 PM2 중지..."
pm2 stop nextjs-app 2>/dev/null || true
pm2 delete nextjs-app 2>/dev/null || true

echo "✅ 완료. 상태 확인: pm2 status"

