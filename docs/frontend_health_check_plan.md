# KimsWeb 프론트엔드 헬스체크 API 연동 계획서

이 계획서는 프론트엔드 리액트(React) 애플리케이션 시작 화면에 백엔드의 `/api/health` API를 호출하는 버튼을 신설하여, 연동 테스트 및 통신이 정상적으로 동작하는지 확인하기 위한 구현 계획서입니다.

---

## 🎯 목표 (Goal)
- Vite React 진입점([App.tsx](file:///home/kdy987/work/KimsWeb/frontend/src/App.tsx))을 수정하여 화면 중앙에 버튼을 하나 생성합니다.
- 해당 버튼 클릭 시 `axios`를 이용해 백엔드의 `/api/health` 엔드포인트를 호출하고, 수신된 결과(상태 및 버전)를 화면에 가시적으로 표시합니다.

---

## 🔒 사용자 검토 필요 사항 (User Review Required)
> [!NOTE]
> - **Proxy 연동**: `vite.config.ts`의 프록시 룰에 따라 `/api` 로 들어오는 요청은 백엔드 `http://localhost:8080`으로 자동 릴레이되므로, 상대 경로 호출(`/api/health`)이 정상 동작하는지 검증합니다.
> - **Tailwind CSS 적용**: 심플한 UI를 보기 좋게 표현하기 위해 Tailwind CSS의 flexbox 정렬 클래스를 사용하여 중앙에 버튼을 배치합니다.

---

## 🛠️ 제안된 변경 사항 (Proposed Changes)

### 1. 진입점 컴포넌트 수정

#### [MODIFY] [App.tsx](file:///home/kdy987/work/KimsWeb/frontend/src/App.tsx)
* 기존 뼈대 코드 대신 버튼 하나와 Axios 호출 상태(data, loading, error)를 그리는 화면으로 단순화합니다.

```tsx
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [healthData, setHealthData] = useState<{ status: string; version: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      // vite.config.ts의 proxy 설정으로 인해 상대 경로 호출 시 백엔드로 포워딩됨
      const response = await axios.get('/api/health');
      setHealthData(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'API 호출 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="p-8 bg-white rounded-2xl shadow-xl max-w-sm w-full text-center border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6 tracking-tight text-blue-600">KimsWeb API</h1>
        <p className="text-gray-500 mb-8 text-sm">백엔드 헬스체크 통신 테스트</p>
        
        <button
          onClick={checkHealth}
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg disabled:bg-blue-300 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {loading ? '호출 중...' : 'Health API 호출'}
        </button>

        {healthData && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl text-left">
            <p className="text-sm font-semibold text-green-800">Status: <span className="font-normal text-gray-700">{healthData.status}</span></p>
            <p className="text-sm font-semibold text-green-800">Version: <span className="font-normal text-gray-700">{healthData.version}</span></p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-left">
            <p className="text-sm font-semibold text-red-800">오류 발생:</p>
            <p className="text-xs text-red-600 font-mono mt-1">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

---

## 🧪 검증 계획 (Verification Plan)

### 수동 검증 (Manual Verification)
1. **백엔드 실행**:
   ```bash
   bash bm.sh run
   ```
2. **프론트엔드 실행**:
   ```bash
   bash fm.sh dev  # 혹은 fm.sh run (메뉴에서 1번 선택)
   ```
3. **통신 확인**:
   * 웹 브라우저로 `http://localhost:3000`에 접속합니다.
   * "Health API 호출" 버튼을 클릭하여 `Status: UP`, `Version: 1.0.0` 정보가 에러 없이 잘 반환되어 출력되는지 브라우저에서 최종 확인합니다.
