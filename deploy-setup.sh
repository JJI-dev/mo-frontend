#!/bin/bash
set -e

echo "🚀 EC2 서버 환경 구축 시작..."

# 시스템 업데이트
echo "📦 시스템 패키지 업데이트 중..."
sudo apt-get update
sudo apt-get upgrade -y

# SSH 설치 확인 및 설치
echo "🔐 SSH 설치 확인 중..."
if ! command -v ssh &> /dev/null; then
    echo "📦 SSH 설치 중..."
    sudo apt-get install -y openssh-server
    sudo systemctl enable ssh
    sudo systemctl start ssh
else
    echo "✅ SSH가 이미 설치되어 있습니다."
    ssh -V
fi

# Node.js 설치 (NodeSource를 통해 LTS 버전 설치)
echo "📦 Node.js 설치 중..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Node.js 버전 확인
node --version
npm --version

# PM2 설치 (프로세스 매니저)
echo "📦 PM2 설치 중..."
sudo npm install -g pm2

# PM2 시작 시 자동 실행 설정
pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Nginx 설치
echo "📦 Nginx 설치 중..."
sudo apt-get install -y nginx

# UFW 방화벽 설정 (HTTP, HTTPS, SSH 허용)
echo "🔥 방화벽 설정 중..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

# 기본 디렉토리 생성
echo "📁 프로젝트 디렉토리 생성 중..."
mkdir -p ~/app
cd ~/app

echo "✅ 서버 환경 구축 완료!"
echo ""
echo "설치된 도구:"
node --version
npm --version
pm2 --version
nginx -v

