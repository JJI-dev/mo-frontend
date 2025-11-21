# GitLab EC2 서버 설정 가이드

## EC2 서버 SSH 키 설정 완료 ✅

EC2 서버에서 GitLab에 접속하기 위한 SSH 키가 생성되었습니다.

## 다음 단계: GitLab에 SSH 공개키 등록

### 1. EC2 서버의 공개키 확인
다음 공개키를 GitLab에 등록해야 합니다:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINjOKCOBy1Ugycc5loBGwr7YzNs4i+EdDTZbC7KYDZSO gitlab@ec2
```

### 2. GitLab에서 SSH 키 등록 방법

1. GitLab에 로그인
2. 우측 상단 프로필 아이콘 클릭 → **Preferences** 또는 **Settings**
3. 왼쪽 메뉴에서 **SSH Keys** 클릭
4. **Key** 필드에 위의 공개키를 붙여넣기
5. **Title** 필드에 "EC2 Server" 또는 원하는 이름 입력
6. **Add key** 버튼 클릭

### 3. SSH 연결 테스트

GitLab에 키를 등록한 후, EC2 서버에서 다음 명령어로 테스트:

```bash
ssh my-aws-server
ssh -T git@gitlab.com
```

정상적으로 연결되면 다음과 같은 메시지가 나타납니다:
```
Welcome to GitLab, @username!
```

### 4. 프로젝트 배포 테스트

SSH 연결이 확인되면 EC2 서버에서 프로젝트를 클론할 수 있습니다:

```bash
ssh my-aws-server
cd ~/app
bash deploy.sh
```

또는 수동으로:

```bash
ssh my-aws-server
cd ~/app
git clone git@gitlab.com:dev.jji/jji/jji.git nextjs-project
cd nextjs-project
npm install
npm run build
pm2 restart nextjs-app
```

## 참고사항

- EC2 서버의 SSH 키는 `~/.ssh/id_ed25519_gitlab`에 저장되어 있습니다
- SSH config는 `~/.ssh/config`에 설정되어 있습니다
- 로컬에서 GitLab에 푸시한 후, EC2 서버에서 `git pull`로 최신 코드를 받을 수 있습니다

