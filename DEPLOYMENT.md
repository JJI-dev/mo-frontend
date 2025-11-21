# 배포 가이드

## 배포 완료! 🎉

EC2 서버에 Next.js 프로젝트가 성공적으로 배포되었습니다.

### 서버 정보
- **EC2 IP**: `3.84.187.232`
- **SSH 호스트**: `my-aws-server`
- **프로젝트 경로**: `~/app/nextjs-project`

### 설치된 도구
- ✅ Node.js v24.11.0
- ✅ npm 11.6.1
- ✅ PM2 6.0.13 (프로세스 매니저)
- ✅ Nginx 1.24.0 (리버스 프록시)

### 접속 방법

#### 웹 브라우저
```
http://3.84.187.232
```

#### SSH 접속
```bash
ssh my-aws-server
```

### 주요 명령어

#### PM2 관리
```bash
# 앱 상태 확인
pm2 status

# 앱 로그 확인
pm2 logs nextjs-app

# 앱 재시작
pm2 restart nextjs-app

# 앱 중지
pm2 stop nextjs-app

# 앱 시작
pm2 start nextjs-app

# 앱 삭제
pm2 delete nextjs-app
```

#### Nginx 관리
```bash
# Nginx 상태 확인
sudo systemctl status nginx

# Nginx 재시작
sudo systemctl restart nginx

# Nginx 설정 파일 위치
/etc/nginx/sites-available/nextjs-app
```

#### 프로젝트 업데이트

**GitLab 레포지토리 사용:**
```bash
# 1. 로컬에서 GitLab에 변경사항 푸시
git add .
git commit -m "Your commit message"
git push origin main

# 2. 서버에서 최신 코드를 가져와서 재빌드 및 재시작
ssh my-aws-server "cd ~/app/nextjs-project && git pull origin main && npm install && npm run build && pm2 restart nextjs-app"
```

**또는 배포 스크립트 사용:**
```bash
ssh my-aws-server "bash ~/app/deploy.sh"
```

### 디렉토리 구조
```
~/app/nextjs-project/    # 프로젝트 루트
├── src/                 # 소스 코드
├── public/              # 정적 파일
├── .next/               # 빌드 결과물 (자동 생성)
├── node_modules/        # 의존성 패키지
└── package.json         # 프로젝트 설정
```

### 다음 단계

1. **도메인 설정** (선택사항)
   - 도메인이 있다면 Nginx 설정에서 `server_name`을 변경하세요
   - `/etc/nginx/sites-available/nextjs-app` 파일 수정

2. **HTTPS 설정** (권장)
   - Let's Encrypt를 사용한 SSL 인증서 설치
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

3. **환경 변수 설정**
   - `.env.local` 파일을 서버에 업로드하여 환경 변수 설정

4. **모니터링 설정**
   - PM2 모니터링: `pm2 monitor`
   - 로그 관리 설정

### 문제 해결

#### 앱이 응답하지 않을 때
```bash
# PM2 상태 확인
pm2 status

# 로그 확인
pm2 logs nextjs-app --lines 50

# Nginx 로그 확인
sudo tail -f /var/log/nginx/error.log
```

#### 포트 충돌
```bash
# 3000번 포트 사용 확인
sudo lsof -i :3000

# Nginx 80번 포트 사용 확인
sudo lsof -i :80
```

#### 방화벽 설정 확인
```bash
# UFW 상태 확인
sudo ufw status

# 포트 열기 (필요시)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### 참고 파일
- `deploy-setup.sh`: 서버 초기 환경 구축 스크립트
- `deploy.sh`: 프로젝트 배포 스크립트
- `nginx-config.sh`: Nginx 설정 스크립트

