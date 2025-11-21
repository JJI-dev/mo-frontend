#!/bin/bash
set -e

DOMAIN="jji.kr"

echo "🌐 HTTP 확인..."
curl -I --max-time 10 "http://$DOMAIN" || true

echo "🔒 HTTPS 확인..."
curl -I --max-time 10 "https://$DOMAIN" || true

echo "📄 콘텐츠 스니핏 확인..."
curl -s --max-time 10 "https://$DOMAIN" | head -n 20

echo "✅ 확인 완료"

