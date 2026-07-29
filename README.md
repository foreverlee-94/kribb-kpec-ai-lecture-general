# KRIBB AI Lecture

파워포인트 대신 웹 기반으로 진행하는 인터랙티브 강의 플랫폼입니다.

React + Vite + TypeScript + Tailwind CSS로 만들어졌습니다.

## 실행 방법

사전 준비물: [Node.js](https://nodejs.org) (LTS 버전, 18.18 이상)

```bash
npm install
npm run dev
```

명령을 실행하면 터미널에 `http://localhost:5173/` 같은 주소가 나타납니다. 이 주소를 브라우저에 입력하면 페이지를 볼 수 있고, 코드를 수정하고 저장하면 화면이 자동으로 갱신됩니다.

배포용 정적 파일을 만들려면:

```bash
npm run build
```

`dist/` 폴더에 결과물이 생성됩니다.

## 폴더 구조

```
src/
  layouts/         페이지 전체 레이아웃 (상단 네비게이터 + LNB + 콘텐츠 영역)
  components/
    layout/        레이아웃을 구성하는 조각들 (TopNav, Sidebar 등)
  pages/           각 라우트(URL)에 대응하는 화면
  data/            강의 목록 등 콘텐츠 데이터
  types/           TypeScript 타입 정의
```

새로운 인터랙티브 요소(차트, 시뮬레이션, 퀴즈 등)는 `src/features/` 폴더를 새로 만들어 그 안에서 확장할 예정입니다.
