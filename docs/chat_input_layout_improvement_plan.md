# KimsWeb AI 채팅 입력창 레이아웃 개선 계획서

이 계획서는 사용자의 피드백을 수용하여, 대화 시작 전(웰컴 상태)과 대화 중(대화 진행 상태)의 채팅 입력창(Chat Input Area) 위치를 다이나믹하게 조정함으로써 모던 AI 서비스(ChatGPT, Gemini 등)의 세련된 사용성을 극대화하기 위한 구현 계획서입니다.

---

## 🎯 목표 (Goal)
- **다이나믹 입력창 배치 (Dynamic Input Placement)**:
  - **대화 시작 전 (웰컴 스크린)**: 입력창이 화면 맨 하단에 처박혀 있지 않고, 화면 중앙의 추천 카드 바로 아래에 위치하여 사용자의 시선 집중과 입력을 자연스럽게 유도합니다.
  - **대화 시작 후 (메시지 리스트)**: 질문이 전송되면 화면이 대화 모드로 전환되며, 입력창이 화면 맨 하단(Bottom)에 고정되어 일반적인 메신저/대화방 레이아웃으로 변경됩니다.
- **매끄러운 트랜지션**: 상태 변화에 따른 레이아웃 변경이 자연스럽게 연출되도록 구조를 분리합니다.

---

## 🔒 사용자 검토 필요 사항 (User Review Required)
> [!NOTE]
> - **인터렉션 플로우**: 최초 접속 시에는 화면 중앙부에 `[로고] -> [웰컴 텍스트] -> [입력창] -> [추천 카드]` 순으로 배치하고, 질문을 전송하는 즉시 상단 네비게이션바 및 하단 입력바 형태의 대화방 뷰로 자연스럽게 스위칭되도록 구현합니다.

---

## 🛠️ 제안된 변경 사항 (Proposed Changes)

### 1. 진입점 컴포넌트 레이아웃 분기 수정

#### [MODIFY] [App.tsx](file:///home/kdy987/work/KimsWeb/frontend/src/App.tsx)
* 입력창 부분을 공통 렌더링 함수(`renderInputArea()`)로 추출합니다.
* `messages.length === 0` 조건에 따라 입력창의 렌더링 위치를 조건부 스위칭합니다.
* JSDoc 파일 개요 주석을 보존합니다.

```tsx
// 웰컴 화면 상태 마크업
<div className="flex flex-col items-center justify-center py-12 text-center h-full max-w-2xl mx-auto w-full">
  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-md shadow-blue-100 border border-blue-100 animate-bounce">
    <Sparkles className="w-8 h-8" />
  </div>
  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">무엇을 도와드릴까요?</h1>
  <p className="text-gray-500 text-sm mb-8 max-w-md font-medium leading-relaxed">
    로컬 Qwen 2.5 및 수집된 문서를 기반으로 금융 지식 및 코딩 질문에 똑똑한 답을 드립니다.
  </p>

  {/* 1. 중앙 채팅 입력창 (웰컴 모드) */}
  <div className="w-full mb-8">
    {renderInputArea()}
  </div>

  {/* 2. 추천 카드 목록 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
    {RECOMMENDATIONS.map((rec, idx) => ...)}
  </div>
</div>
```

---

## 🧪 검증 계획 (Verification Plan)

### 수동 검증 (Manual Verification)
1. **개발 서버 컴파일**:
   ```bash
   cd frontend
   npm run build
   ```
   * 레이아웃 리팩토링 후 컴파일 에러가 발생하지 않는지 확인합니다.
2. **화면 렌더링 검사**:
   * `http://localhost:3001`에 접속하여 첫 진입 시 **중앙에 배치된 입력창**을 확인합니다.
   * 추천 카드를 클릭하거나 텍스트를 입력하고 전송했을 때, 대화 목록 화면으로 부드럽게 전환되며 **입력창이 하단(Bottom)으로 이동 및 고정**되는지 동작을 최종 검증합니다.
