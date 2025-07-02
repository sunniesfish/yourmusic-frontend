# YOURMUSIC Frontend

## 기술 스택

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**:
  - Global State: Zustand
  - Server State: Apollo Client
- **UI Components**:
  - Radix UI
  - Custom components with Tailwind CSS
- **Form Handling**: React Hook Form
- **API Integration**: GraphQL with Apollo Client
- **Code Generation**: GraphQL Codegen

## 주요 기능

- 플레이리스트 관리
- 음악 통계 분석
- 반응형 디자인

## 프로젝트 구조

```
src/
├── app/          # Next.js App Router 페이지
├── components/   # 재사용 가능한 UI 컴포넌트
├── graphql/      # GraphQL 관련 파일 (queries, mutations, types)
├── hooks/        # Custom React Hooks
├── lib/          # 유틸리티 함수 및 설정
├── providers/    # React Context Providers
├── store/        # Zustand 상태 관리
└── types/        # TypeScript 타입 정의
```

## 성능 최적화

- React Server Components (RSC) 활용
- Web Workers를 통한 통계 계산
- Apollo Client 캐싱 전략

## 배포

프로젝트는 Vercel을 통해 배포됩니다. main 브랜치에 병합되면 자동으로 배포가 진행됩니다.
