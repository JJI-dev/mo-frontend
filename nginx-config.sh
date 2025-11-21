#!/bin/bash
set -e

# 🚨 반드시 실제 GitLab 레포지토리가 서버에 클론된 경로로 수정하세요!
JJI_REPO_PATH="/path/to/jji/repo" 

echo "⚙️  Nginx 설정 업데이트 중... (모노레포 분리 반영)"

# Nginx 설정 파일 생성 (nextjs-app.conf로 이름 변경)
sudo tee /etc/nginx/sites-available/jji-monorepo > /dev/null <<EOF
map \$http_upgrade \$connection_upgrade {
    default upgrade;
    ''      close;
}

# 1. 메인 앱 (jji.kr) - Next.js 앱
upstream next_app {
    server 127.0.0.1:3000; # PM2 등으로 실행 중인 Next.js 앱 포트
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name jji.kr www.jji.kr; # 메인 도메인만

    location / {
        proxy_pass http://next_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \$connection_upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}

# 2. 서브도메인 - 정적 웹사이트 (mo.jji.kr)
server {
    listen 80;
    listen [::]:80;
    server_name mo.jji.kr;
    
    # 🚨 mo 폴더의 콘텐츠를 서비스하도록 root 경로를 지정
    root ${JJI_REPO_PATH}/mo;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }
}

# 3. 서브도메인 - 정적 웹사이트 (career.jji.kr)
server {
    listen 80;
    listen [::]:80;
    server_name career.jji.kr;
    
    # 🚨 career 폴더의 콘텐츠를 서비스하도록 root 경로를 지정
    root ${JJI_REPO_PATH}/career;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }
}

# 4. 서브도메인 - 정적 웹사이트 (cv.jji.kr)
server {
    listen 80;
    listen [::]:80;
    server_name cv.jji.kr;
    
    root ${JJI_REPO_PATH}/cv;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }
}

# 5. 서브도메인 - 정적 웹사이트 (ne.jji.kr)
server {
    listen 80;
    listen [::]:80;
    server_name ne.jji.kr;
    
    root ${JJI_REPO_PATH}/ne;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }
}


# 기본 서버 (IP/기타 호스트로 접근 시 처리)
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://next_app; # 기본 서버도 메인 앱으로 연결 유지
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \$connection_upgrade;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}
EOF

# 이전 링크 제거 및 새 링크 생성 (이름 변경)
sudo rm -f /etc/nginx/sites-enabled/nextjs-app
sudo ln -sf /etc/nginx/sites-available/jji-monorepo /etc/nginx/sites-enabled/

# Nginx 설정 테스트 및 재시작
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "✅ Nginx 모노레포 설정 완료!"