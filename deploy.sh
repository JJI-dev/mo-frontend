#!/bin/bash
set -e

echo "🚀 Next.js 프로젝트 배포 시작..."

# 현재 스크립트 위치에서 프로젝트 디렉토리 찾기
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo "📁 프로젝트 디렉토리: $PROJECT_DIR"
cd "$PROJECT_DIR"

# Git 저장소가 있는지 확인
if [ -d ".git" ]; then
    echo "🔄 기존 프로젝트에서 최신 변경사항 가져오기..."
    git fetch origin || echo "⚠️  git fetch 실패 (원격 저장소가 없을 수 있음)"
    CURRENT_BRANCH=$(git branch --show-current)
    echo "현재 브랜치: $CURRENT_BRANCH"
    if git ls-remote --heads origin "$CURRENT_BRANCH" | grep -q "$CURRENT_BRANCH"; then
        git reset --hard "origin/$CURRENT_BRANCH" || echo "⚠️  git reset 실패"
    fi
else
    echo "⚠️  Git 저장소가 없습니다. 현재 디렉토리에서 직접 배포합니다."
fi

# 의존성 설치
echo "📦 npm 의존성 설치 중..."
npm install

# 프로덕션 빌드
echo "🔨 프로덕션 빌드 중..."
npm run build

# 로그 디렉토리 생성
mkdir -p logs

# PM2로 앱 실행/재시작 (ecosystem 사용)
echo "🔄 PM2로 앱 실행 중..."
pm2 delete nextjs-app 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

echo "✅ 배포 완료!"
echo ""
echo "PM2 상태:"
pm2 status

echo ""
echo "애플리케이션이 http://localhost:3000 에서 실행 중입니다."
echo "Nginx를 통해 외부에서 접근할 수 있도록 설정하세요."

