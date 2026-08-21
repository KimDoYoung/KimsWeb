/**
 * @fileoverview KimsWeb 프론트엔드 메인 진입점 컴포넌트
 * @description 헬스체크 통신 테스트 등 메인 화면 레이아웃과 뷰 구성을 관리합니다
 * @module App
 * @author KimsWeb
 * @created 2026-08-21
 */
import { useState } from 'react';
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
