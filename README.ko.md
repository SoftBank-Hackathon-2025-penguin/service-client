# 🐧 Penguin-Land

<div align="center">

**Terraform 기반 원클릭 AWS 배포와 펭귄의 귀여운 코칭 모니터링**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**언어 / Language:** [🇯🇵 日本語](README.md) | [🇰🇷 한국어](README.ko.md) | [🇺🇸 English](README.en.md)

</div>

---

## 📝 프로젝트 개요

**Penguin-Land**는 Terraform을 활용하여 AWS 인프라를 원클릭으로 배포하고, 펭귄 캐릭터를 통한 게이미피케이션된 모니터링을 제공하는 서비스입니다.

### 🎯 해커톤 테마

DevOps 초보자도 쉽게 클라우드 인프라를 구축하고, 시스템 상태를 직관적으로 이해할 수 있도록 하는 것을 목표로 했습니다.

---

## ✨ 주요 기능

### 1. 🚀 원클릭 배포

- 버튼 하나로 7가지 AWS 리소스 자동 생성
- Terraform Plan 시각화
- 실시간 로그 표시
- 자동 롤백 기능

**생성되는 AWS 리소스:**

- EC2 Instance (t2.micro)
- VPC (네트워크 격리)
- DynamoDB (NoSQL 데이터베이스)
- S3 (정적 파일 스토리지)
- Lambda (이벤트 처리)
- CloudWatch (로그 & 모니터링)
- SNS (알림 서비스)

### 2. 🐧 펭귄 코칭

시스템 상태에 따라 펭귄의 표정이 변화하여, 직관적으로 상태를 파악할 수 있습니다.

- **😊 Happy**: 시스템이 안정적인 상태
- **😐 Worried**: 약간 주의가 필요한 상태
- **😢 Crying**: 긴급 대응이 필요한 상태

### 3. 📊 실시간 모니터링

CloudWatch 기반 메트릭을 실시간으로 모니터링하고, 이상 징후를 자동 감지합니다.

**모니터링 항목:**

- CPU 사용률
- 레이턴시 (응답 시간)
- 에러율

### 4. 🎮 시뮬레이션 모드

데모용으로 다음 시나리오를 시뮬레이션할 수 있습니다:

- **CPU 스파이크**: CPU 사용률이 85%로 급상승
- **높은 레이턴시**: 응답 시간이 850ms로 증가
- **에러 버스트**: 에러율이 8%로 급상승

---

## 🛠️ 기술 스택

### 프론트엔드

- **React 19** - 최신 React 프레임워크
- **TypeScript** - 타입 안전한 개발
- **Vite** - 고속 빌드 도구
- **Styled Components** - CSS-in-JS
- **React Router v7** - 라우팅

### 상태 관리 & 데이터 페칭

- **Zustand** - 경량 상태 관리
- **TanStack Query** - 서버 상태 관리
- **Axios** - HTTP 클라이언트

### UI/UX

- **Lottie** - 부드러운 애니메이션
- **Canvas Confetti** - 축하 효과
- **Noto Sans JP** - 일본어 폰트

### 개발 도구

- **MSW (Mock Service Worker)** - API 모킹
- **ESLint** - 코드 품질
- **Prettier** - 코드 포맷팅

---

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18 이상
- pnpm (권장) 또는 npm

### 설치

```bash
# 리포지토리 클론
git clone <repository-url>
cd service-client

# 의존성 패키지 설치
pnpm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 편집하여 MSW on/off 설정

# 개발 서버 시작
pnpm dev
```

### 환경 변수 설정

`.env` 파일에서 다음 설정이 가능합니다:

| 변수명              | 설명                                                                             | 기본값                  |
| ------------------- | -------------------------------------------------------------------------------- | ----------------------- |
| `VITE_ENABLE_MSW`   | MSW 모킹 활성화 여부<br/>`true`: 모킹 API 사용<br/>`false`: 실제 백엔드 API 사용 | `true`                  |
| `VITE_API_BASE_URL` | 백엔드 API 베이스 URL<br/>(MSW 비활성화 시 사용)                                 | `http://localhost:8000` |

**예: MSW를 비활성화하고 실제 백엔드를 사용하는 경우**

```env
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=http://localhost:8000
```

### 접속

브라우저에서 `http://localhost:3000` 에 접속하세요.

---

## 📦 프로젝트 구조

```
service-client/
├── src/
│   ├── api/               # API 통신
│   ├── components/        # React 컴포넌트
│   │   ├── common/       # 공통 컴포넌트
│   │   ├── dashboard/    # 대시보드
│   │   ├── deploy/       # 배포
│   │   └── pages/        # 페이지
│   ├── hooks/            # 커스텀 훅
│   ├── mocks/            # MSW 모킹
│   ├── stores/           # Zustand 스토어
│   ├── types/            # TypeScript 타입 정의
│   ├── utils/            # 유틸리티 함수
│   └── theme/            # 테마 설정
├── public/               # 정적 파일
└── index.html           # 엔트리 포인트
```

---

## 🎨 디자인 특징

### 🌈 컬러 스킴

- **Primary**: `#3B82F6` (블루)
- **Healthy**: `#22C55E` (그린)
- **Warning**: `#F59E0B` (오렌지)
- **Danger**: `#EF4444` (레드)

### 💫 애니메이션

- 배포 완료 시 화려한 불꽃놀이 효과
- 펭귄의 귀여운 애니메이션
- 부드러운 페이지 전환

---

## 🧪 개발 모드

### MSW (Mock Service Worker)

백엔드 없이 프론트엔드 개발이 가능하도록 MSW로 API를 모킹하고 있습니다.

**배포 시뮬레이션:**

- 0초: 초기화 (0%)
- 5초: 계획 단계 (10%)
- 15초: 리소스 생성 시작 (30%)
- 30초: 진행 중 (60%)
- 45초: 완료 (100%) 🎉

### 환경 변수

```env
# .env.development
VITE_ENABLE_MOCK=true
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📱 주요 화면

### 1. 랜딩 페이지 (`/`)

프로젝트 소개와 주요 기능을 표시합니다.

### 2. 배포 콘솔 (`/deploy`)

- 원클릭 배포
- 실시간 진행률 표시
- 로그 뷰어
- 리소스 정보 표시
- 전체 삭제 기능

### 3. 모니터링 대시보드 (`/dashboard`)

- 펭귄 코칭
- 메트릭 카드 (CPU, 레이턴시, 에러율)
- 알림 목록
- 시뮬레이션 패널

---

## 🎯 향후 확장 계획

- [ ] Terraform에서 리소스뿐만 아니라 CI/CD 파이프라인까지 자동 생성
- [ ] Grafana를 이용한 CloudWatch 대시보드 개발

---

## 👥 팀

**Penguin-Land Team**

- Software Engineer × 4명

---

## 📄 라이선스

MIT License

---

## 🙏 감사의 말

이 프로젝트는 해커톤을 위해 개발되었습니다.
DevOps의 세계를 더 친근하고 즐겁게 만드는 것을 목표로 하고 있습니다.

---

<div align="center">

**Made with ❤️ and 🐧**

</div>
