#!/bin/bash

# ============================================
# KimsWeb Frontend 폴더 구조 생성 스크립트
# frontend 디렉토리 안에서 실행하세요
# ============================================

echo "🚀 KimsWeb Frontend 폴더 구조 생성 중..."

# src 디렉토리로 이동
cd src

# 1. 디렉토리 생성
echo "📁 디렉토리 생성..."
mkdir -p api components/chat components/document components/common
mkdir -p store hooks types utils

# 2. API 파일 생성
echo "📄 API 파일 생성..."
touch api/chatApi.ts
touch api/documentApi.ts
touch api/authApi.ts

# 3. 컴포넌트 파일 생성
echo "📄 컴포넌트 파일 생성..."
touch components/chat/ChatWindow.tsx
touch components/chat/ChatMessage.tsx
touch components/chat/ChatInput.tsx
touch components/document/DocumentUploader.tsx
touch components/document/DocumentList.tsx
touch components/common/Header.tsx
touch components/common/Layout.tsx

# 4. Store 파일 생성
echo "📄 Store 파일 생성..."
touch store/chatStore.ts
touch store/documentStore.ts
touch store/authStore.ts

# 5. Hooks 파일 생성
echo "📄 Hooks 파일 생성..."
touch hooks/useSSE.ts
touch hooks/useChat.ts

# 6. Types 파일 생성
echo "📄 Types 파일 생성..."
touch types/chat.ts
touch types/document.ts

# 7. Utils 파일 생성
echo "📄 Utils 파일 생성..."
touch utils/axios.ts
touch utils/constants.ts

echo ""
echo "✅ KimsWeb Frontend 폴더 구조 생성 완료!"
echo ""
echo "📂 생성된 구조:"
echo "src/"
echo "├── api/"
echo "│   ├── chatApi.ts"
echo "│   ├── documentApi.ts"
echo "│   └── authApi.ts"
echo "├── components/"
echo "│   ├── chat/"
echo "│   │   ├── ChatWindow.tsx"
echo "│   │   ├── ChatMessage.tsx"
echo "│   │   └── ChatInput.tsx"
echo "│   ├── document/"
echo "│   │   ├── DocumentUploader.tsx"
echo "│   │   └── DocumentList.tsx"
echo "│   └── common/"
echo "│       ├── Header.tsx"
echo "│       └── Layout.tsx"
echo "├── store/"
echo "│   ├── chatStore.ts"
echo "│   ├── documentStore.ts"
echo "│   └── authStore.ts"
echo "├── hooks/"
echo "│   ├── useSSE.ts"
echo "│   └── useChat.ts"
echo "├── types/"
echo "│   ├── chat.ts"
echo "│   └── document.ts"
echo "└── utils/"
echo "    ├── axios.ts"
echo "    └── constants.ts"