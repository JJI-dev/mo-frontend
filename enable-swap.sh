#!/bin/bash
set -e

SIZE_GB=${1:-2}
SIZE_MB=$((SIZE_GB*1024))

echo "💾 스왑 파일 생성 (${SIZE_GB}G)"

if [ -f /swapfile ]; then
  echo "이미 /swapfile 이 존재합니다. 활성화 확인 중..."
  sudo swapon --show || true
else
  if command -v fallocate >/dev/null 2>&1; then
    sudo fallocate -l ${SIZE_GB}G /swapfile
  else
    sudo dd if=/dev/zero of=/swapfile bs=1M count=${SIZE_MB}
  fi
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
fi

echo "✅ 스왑 설정 완료"
free -h

