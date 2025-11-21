#!/bin/bash
set -e

# 사용법: ./ssl-setup.sh your@email.com
EMAIL="$1"
if [ -z "$EMAIL" ]; then
  echo "❌ 이메일을 인자로 전달하세요. 예) ./ssl-setup.sh admin@jji.kr"
  exit 1
fi

DOMAIN_ROOT="jji.kr"
DOMAIN_WWW="www.jji.kr"

echo "🔐 Certbot 설치 및 SSL 발급 (도메인: $DOMAIN_ROOT, $DOMAIN_WWW, 이메일: $EMAIL)"

sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

echo "📝 Nginx 서버 블록 확인 및 테스트"
sudo nginx -t
sudo systemctl reload nginx || true

echo "📥 인증서 발급 진행..."
sudo certbot --nginx -d "$DOMAIN_ROOT" -d "$DOMAIN_WWW" \
  --non-interactive --agree-tos -m "$EMAIL" --redirect

echo "🔁 자동 갱신 크론 확인"
sudo systemctl status certbot.timer >/dev/null 2>&1 || sudo systemctl enable --now certbot.timer

echo "✅ SSL 설정 완료! 브라우저에서 https://$DOMAIN_ROOT 로 확인하세요."

