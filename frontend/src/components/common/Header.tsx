import React from 'react';
import { useAuthStore } from '../../store/authStore';

export const Header: React.FC = () => {
  const { username, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏠</span>
          <h1 className="text-2xl font-bold text-gray-800">KimsWeb</h1>
          <span className="text-sm text-gray-500">우리 가족 AI 지식 작업실</span>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <span className="text-sm text-gray-600">👤 {username}</span>
              <button
                onClick={logout}
                className="rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
