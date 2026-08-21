/**
 * @fileoverview KimsWeb AI 채팅 메인 UI 컴포넌트
 * @description 사이드바, 모델 선택, 추천 질문 카드 및 대화 시뮬레이션을 제공하는 모던 AI 채팅 화면을 구현합니다
 * @module App
 * @author KimsWeb
 * @created 2026-08-21
 */
import { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  FileText, 
  Code, 
  Lightbulb,
  Mail,
  ChevronDown,
  Sparkles,
  Settings,
  Bot,
  PanelLeftClose,
  PanelLeft,
  Info
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 최근 대화방 목록 (목업)
  const [recentChats] = useState([
    { id: '1', title: 'React 상태 관리 설계 및 토론' },
    { id: '2', title: 'RAG 인덱싱 파일 업로드 검증' },
    { id: '3', title: 'PostgreSQL 백엔드 접속 이슈 조치' },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 메시지 전송 처리
  const handleSendMessage = (textToSend: string) => {
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

    // AI 모크 응답 시뮬레이션 (1.2초 후 응답)
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

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* 1. 사이드바 (Sidebar) */}
      <div 
        className={`bg-gray-900 text-gray-300 flex flex-col transition-all duration-300 border-r border-gray-800 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        {/* 사이드바 헤더 */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2 font-bold text-white tracking-wide">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>KimsWeb AI</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            <PanelLeftClose className="w-5 h-5" />
          </Button>
        </div>

        {/* 새 채팅 버튼 */}
        <div className="p-3">
          <Button 
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-5 justify-start px-4 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="font-semibold text-sm">새로운 채팅</span>
          </Button>
        </div>

        {/* 최근 대화방 리스트 */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          <span className="px-3 text-xs text-gray-500 font-bold tracking-wider">최근 대화 목록</span>
          {recentChats.map((chat) => (
            <button
              key={chat.id}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors group relative"
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span className="truncate pr-4">{chat.title}</span>
            </button>
          ))}
        </div>

        {/* 사용자 정보 및 설정 */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400 hover:text-white cursor-pointer py-1.5 px-2 rounded-lg hover:bg-gray-800">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>시스템 설정</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-800/50 border border-gray-800 mt-2">
            <Avatar className="w-9 h-9 border border-gray-700">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">K</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">kdy987</p>
              <p className="text-xs text-gray-500 truncate">Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 메인 대화 영역 (Main Chat Workspace) */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        
        {/* 상단 네비바 */}
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white/85 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-600 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsSidebarOpen(true)}
              >
                <PanelLeft className="w-5 h-5" />
              </Button>
            )}
            
            {/* 모델 선택 드롭다운 (Dropdown Menu) */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm cursor-pointer transition-colors outline-none">
                <Bot className="w-4 h-4 text-blue-500" />
                <span>{selectedModel.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 p-2 rounded-xl border border-gray-200 shadow-xl bg-white">
                {MODELS.map((model) => (
                  <DropdownMenuItem
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className="flex flex-col items-start gap-1 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer text-left focus:bg-gray-50 focus:text-gray-900"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sm text-gray-800">
                      {model.id === 'qwen2.5' && <Sparkles className="w-3.5 h-3.5 text-blue-500" />}
                      <span>{model.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-normal leading-normal">{model.desc}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>백엔드 정상 작동 중</span>
            </div>
          </div>
        </header>

        {/* 중앙 대화 내용 or 웰컴 화면 */}
        <div className="flex-1 overflow-y-auto px-4 py-8 max-w-3xl mx-auto w-full space-y-6">
          
          {messages.length === 0 ? (
            /* 2-A. 최초 진입 웰컴 스크린 */
            <div className="flex flex-col items-center justify-center py-16 text-center h-full max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-md shadow-blue-100 border border-blue-100 animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                무엇을 도와드릴까요?
              </h1>
              <p className="text-gray-500 text-sm mb-12 max-w-md font-medium leading-relaxed">
                로컬 Qwen 2.5 및 수집된 문서를 기반으로 금융 지식 및 코딩 질문에 똑똑한 답을 드립니다.
              </p>

              {/* 퀵 추천 카드 목록 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {RECOMMENDATIONS.map((rec, idx) => {
                  const Icon = rec.icon;
                  return (
                    <Card 
                      key={idx}
                      onClick={() => handleRecommendClick(rec.text)}
                      className="border border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all duration-200 group text-left rounded-xl hover:-translate-y-0.5"
                    >
                      <CardContent className="p-4 flex gap-4 items-start">
                        <div className={`p-2.5 rounded-lg flex-shrink-0 ${rec.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">
                            {rec.title}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {rec.text}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 2-B. 대화 메시지 목록 */
            <div className="space-y-6">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-4 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role !== 'user' && (
                    <Avatar className="w-9 h-9 border border-gray-200 flex-shrink-0">
                      <AvatarFallback className="bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex flex-col max-w-[80%] space-y-1">
                    <div 
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-100'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                    
                    <span className="text-[10px] text-gray-400 px-1">
                      {msg.model && <span className="font-semibold text-gray-500 mr-1.5">{msg.model}</span>}
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <Avatar className="w-9 h-9 border border-gray-200 flex-shrink-0">
                      <AvatarFallback className="bg-gray-800 text-white font-bold text-xs">
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* AI 타이핑 애니메이션 효과 */}
              {isTyping && (
                <div className="flex gap-4 justify-start">
                  <Avatar className="w-9 h-9 border border-gray-200 flex-shrink-0">
                    <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}

        </div>

        {/* 하단 입력 영역 (Chat Input Area) */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto w-full relative">
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="relative flex items-center bg-gray-55 border border-gray-200 focus-within:border-blue-500 rounded-2xl overflow-hidden px-4 py-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-100"
            >
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`${selectedModel.name}에게 질문을 작성하세요...`}
                className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm text-gray-800 placeholder-gray-400 pr-12 min-h-[40px]"
              />
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
                className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white w-9 h-9 rounded-xl flex items-center justify-center disabled:bg-gray-100 disabled:text-gray-300 transition-colors shadow-sm cursor-pointer"
              >
                <Send className="w-4.5 h-4.5" />
              </Button>
            </form>

            <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] text-gray-400 font-medium">
              <Info className="w-3 h-3 text-gray-300" />
              <span>AI 모델은 부정확한 정보를 출력할 수 있으므로 주요 사실은 별도 검증이 필요합니다.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
