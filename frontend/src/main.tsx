/**
 * @fileoverview KimsWeb 프론트엔드 React DOM 렌더링 엔트리 포인트
 * @description React 19 가상 DOM 기동 및 App 컴포넌트 렌더링을 처리합니다
 * @module main
 * @author KimsWeb
 * @created 2026-08-21
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
