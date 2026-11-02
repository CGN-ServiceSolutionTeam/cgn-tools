# CGN Tools

CGN 방송 콘텐츠 운영을 위한 내부 웹 도구 모음입니다.
프론트엔드는 Cloudflare Pages, 백엔드(이미지 업로드 API)는 Cloudflare Workers에서 동작합니다.

## 기능

| 경로 | 메뉴 | 설명 |
|------|------|------|
| `/` | 📺 모니터링 | 카테고리·프로그램·날짜·화질을 선택해 CloudFront의 MP4 영상을 바로 재생 |
| `/generator` | 🔗 경로 생성 | 화질별 영상 URL과 썸네일 URL을 생성하고 클립보드로 복사 |
| `/upload` | 📤 이미지 업로드 | 이번 주 업로드 스케줄의 썸네일 상태 확인, PNG 썸네일을 S3(`thumb/`)에 업로드 |
| `/parser` | 📖 본문 파싱 | 성경 약어 표기(예: `요 3:16~18`, `John 3:16`)를 전체 이름으로 변환 |
| `/viewport` | (숨김) | 현재 CSS 뷰포트 크기와 DPR 측정 |

상단 메뉴의 **📋 편성표**에서 관련 Google 스프레드시트로 이동할 수 있습니다.

## 기술 스택

- **Frontend**: React 19, React Router 7, Vite 6, TypeScript
- **Backend**: Cloudflare Workers, `@aws-sdk/client-s3`
- **Infra**: Cloudflare Pages(+ Pages Functions), AWS S3 / CloudFront, GitHub Actions

## 프로젝트 구조

```
cgn-tools/
├── backend/                  # Cloudflare Workers (POST /api/upload, GET /health)
│   ├── src/index.ts
│   └── wrangler.toml
├── frontend/
│   ├── functions/_middleware.ts   # Pages Functions: IP 허용 목록 접근 제한
│   ├── public/_redirects          # SPA 라우팅
│   └── src/
│       ├── config/programs.example.ts  # 프로그램 목록 예시 (programs.ts로 복사)
│       └── pages/
└── .github/workflows/deploy.yml   # master push 시 자동 배포
```

## 로컬 실행

### 1. 프로그램 설정 파일 생성

`programs.ts`는 Git에 포함되지 않습니다. 예시 파일을 복사한 뒤 실제 데이터를 채워주세요.

```bash
cp frontend/src/config/programs.example.ts frontend/src/config/programs.ts
```

> 모니터링·경로 생성 페이지는 기본 카테고리로 `큐티`를 사용하므로 `categories`에 `큐티` 키가 있어야 합니다.

### 2. 백엔드

```bash
cd backend
npm install
npm run dev        # http://localhost:8787
```

### 3. 프론트엔드

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

> 실행에 필요한 환경 변수는 저장소에 포함되어 있지 않습니다. 담당자에게 문의하세요.

## 배포

`master` 브랜치에 push하면 GitHub Actions가 백엔드(Workers)와 프론트엔드(Pages)를 순서대로 자동 배포합니다.

## 접근 제한

배포된 사이트는 `frontend/functions/_middleware.ts`의 `ALLOWED_IPS`에 등록된 IP에서만 접근할 수 있습니다. 허용 IP를 바꾸려면 이 배열을 수정하세요.
