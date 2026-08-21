# KimsWeb AI 채팅 메인 화면 UI 디자인 계획서 (Shadcn/ui 및 Lucide 반영)

이 계획서는 Gemini, ChatGPT, Claude, DeepSeek와 같이 모던하고 깔끔한 사용성을 제공하는 AI 채팅 웹 인터페이스의 메인 화면 디자인 및 레이아웃을 React, Tailwind CSS, 그리고 사용자에게 친숙한 **Lucide React** 아이콘 및 **shadcn/ui** 컴포넌트를 기반으로 설계하는 구현 계획서입니다.

---

## 🎯 목표 (Goal)
- **shadcn/ui 환경 초기화**: Vite + Tailwind 4 환경에 최적화된 shadcn/ui 구성을 셋업합니다.
- **모던 AI 챗 UI 디자인**: 사이드바(대화 목록 및 액션)와 메인 대화 영역(모델 선택, 추천 질문 카드, 입력창)을 포함하는 반응형 투-컬럼 레이아웃을 완성합니다.
- **인터렉티브 목업 기능**: 추천 질문 카드 클릭 시 질문이 입력창에 자동 세팅되거나, 메시지 전송 시 채팅 화면에 즉각 말풍선이 생성되는 동작을 가볍게 구현하여 실제 작동하는 감각을 제공합니다.
- **로그인 프리(Free) 진입**: 복잡한 JWT 인증이나 로그인 과정 없이 브라우저를 열자마자 바로 채팅 레이아웃을 경험할 수 있도록 구성합니다.

---

## 🔒 사용자 검토 필요 사항 (User Review Required)
> [!IMPORTANT]
> - **shadcn/ui 설치 및 Tailwind 4 통합**: 최신 shadcn CLI(`npx shadcn@latest init`)를 사용해 비대화식 설치(-y)를 진행하며, 프로젝트에 이미 설정된 `@` 경로 별칭과 자연스럽게 결합되도록 구성합니다.
> - **필요 컴포넌트 셋업**: shadcn/ui에서 제공하는 풍부한 UI 컴포넌트들 중, 이번 화면 구성에 유용한 `button`, `card`, `dropdown-menu`, `input`, `avatar` 등을 사전 설치하여 구현의 완성도를 끌어올립니다.

---

## 🛠️ 제안된 변경 사항 (Proposed Changes)

### 1. shadcn/ui 의존성 설치 및 컴포넌트 추가
* 프론트엔드 환경에서 다음과 같은 명령어로 shadcn을 기동하고 필요한 UI 컴포넌트들을 내려받습니다.
```bash
npx shadcn@latest init -y
npx shadcn@latest add button card dropdown-menu input avatar
```

### 2. 메인 진입점 컴포넌트 덮어쓰기

#### [MODIFY] [App.tsx](file:///home/kdy987/work/KimsWeb/frontend/src/App.tsx)
* 설치된 shadcn UI 컴포넌트와 Lucide 아이콘을 접목하여, 고급스러운 모던 AI 채팅 메인 화면 코드로 변경합니다. JSDoc 파일 개요 주석을 보존합니다.

```tsx
/**
 * @fileoverview KimsWeb AI 채팅 메인 UI 컴포넌트
 * @description 사이드바와 추천 질문 카드, 멀티 모델 선택, 입력창을 포함하는 모던 AI 챗 레이아웃을 구현합니다
 * @module App
 * @author KimsWeb
 * @created 2026-08-21
 */
import { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  RefreshCw,
  FileText, 
  Code, 
  Lightbulb,
  Mail,
  ChevronDown,
  Sparkles,
  Settings,
  User,
  ExternalLink,
  Bot
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ... (상세 UI 마크업 작성 예정)
```

---

## 🧪 검증 계획 (Verification Plan)

### 수동 검증 (Manual Verification)
1. **의존성 설치**:
   ```bash
   cd frontend
   npm install lucide-react
   npx -y shadcn@latest init -y
   npx -y shadcn@latest add button card dropdown-menu input avatar -y
   ```
2. **개발 서버 실행**:
   ```bash
   bash fm.sh dev
   ```
3. **브라우저 렌더링 확인**:
   * `http://localhost:3001`에 접속하여 사이드바, 모델 선택 드롭다운, 추천 카드, 반응형 챗 입력창이 Lucide 아이콘과 shadcn 컴포넌트 조합으로 모던하게 출력되는지 시각적 레이아웃을 최종 확인합니다.
