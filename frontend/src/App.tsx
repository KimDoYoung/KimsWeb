/**
 * @fileoverview KimsWeb AI 채팅 메인 진입점 컴포넌트
 * @description 전역 상태(모델 선택, 대화 히스토리, 사이드바 토글)를 제어하고 분리된 서브 컴포넌트들을 조립하여 메인 워크스페이스를 연출합니다
 * @module App
 * @author KimsWeb
 * @created 2026-08-21
 */
import { useState, useRef } from 'react';
import { Mail, FileText, Code, Lightbulb } from 'lucide-react';
import { Layout } from '@/components/common/Layout';
import { Header } from '@/components/common/Header';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatInput } from '@/components/chat/ChatInput';

// 모델 리스트 정의
const MODELS = [
  { id: 'qwen2.5', name: 'Qwen 2.5 (Local)', desc: '로컬 환경에 배포된 고성능 AI 모델 (14b)' },
  { id: 'gpt-4o', name: 'GPT-4o (OpenAI)', desc: '복잡한 문제 해결을 위한 멀티모달 상용 AI' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', desc: '고성능 코딩 및 장문 분석 전문 AI' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', desc: '단계적 논리 추론 및 연산 전문 AI' }
];

// 추천 질문 리스트
const RECOMMENDATIONS = [
  { 
    title: '이메일 초안 작성', 
    text: '업무 파트너에게 미팅 일정을 조정하는 정중한 이메일 작성해줘', 
    icon: Mail,
    color: 'text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30'
  },
  { 
    title: '보고서 요약', 
    text: '주요 비즈니스 매출 데이터 보고서의 핵심 요약을 마크다운 표 형태로 정리해줘', 
    icon: FileText,
    color: 'text-emerald-500 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30'
  },
  { 
    title: '코드 디버깅', 
    text: 'React useEffect 의존성 배열로 인한 무한 루프 발생 원인과 해결 코드를 보여줘', 
    icon: Code,
    color: 'text-purple-500 bg-purple-50 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/30'
  },
  { 
    title: '아이디어 구상', 
    text: '신규 RAG 문서 검색 시스템을 홍보하기 위한 테크 블로그 글감 3가지만 추천해줘', 
    icon: Lightbulb,
    color: 'text-amber-500 bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30'
  }
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: Date;
}

function App() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 최근 대화방 목록 (Zustand 연동 전 임시 상태)
  const [recentChats] = useState([
    { id: '1', title: 'React 상태 관리 설계 및 토론' },
    { id: '2', title: 'RAG 인덱싱 파일 업로드 검증' },
    { id: '3', title: 'PostgreSQL 백엔드 접속 이슈 조치' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const textToSend = inputMessage;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // AI 모크 응답 시뮬레이션
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `현재 선택된 **${selectedModel.name}** 엔진과 RAG 연동이 성황리에 연결 대기 중입니다.\n\n로컬 컴포넌트 구성과 **shadcn/ui** 설정이 잘 반영되어 있으며, 원격 PostgreSQL, Redis, ChromaDB에 대한 접속 검증도 완수된 상태입니다. 실질적인 SSE 스트리밍 연동 대화방 기능도 곧 구현 예정이니 기대해주세요!`,
        model: selectedModel.name,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleRecommendClick = (text: string) => {
    setInputMessage(text);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  // 공통 입력 폼 렌더링 (ChatInput 래핑)
  const renderInputForm = () => (
    <ChatInput
      value={inputMessage}
      onChange={setInputMessage}
      onSubmit={handleSendMessage}
      disabled={!inputMessage.trim() || isTyping}
      placeholder={`${selectedModel.name}에게 질문을 작성하세요...`}
    />
  );

  return (
    <Layout
      isSidebarOpen={isSidebarOpen}
      onSidebarClose={() => setIsSidebarOpen(false)}
      recentChats={recentChats}
      onNewChat={handleNewChat}
    >
      {/* 상단 헤더 */}
      <Header
        isSidebarOpen={isSidebarOpen}
        onSidebarOpen={() => setIsSidebarOpen(true)}
        selectedModel={selectedModel}
        onModelSelect={setSelectedModel}
        models={MODELS}
      />

      {/* 중앙 대화 본문 영역 */}
      <ChatWindow
        messages={messages}
        recommendations={RECOMMENDATIONS}
        onRecommendClick={handleRecommendClick}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        renderInput={renderInputForm()}
      />

      {/* 하단 고정 입력 영역 (대화방 진입 시에만 노출) */}
      {messages.length > 0 && (
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto w-full relative animate-in fade-in slide-in-from-bottom-2 duration-300">
            {renderInputForm()}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
