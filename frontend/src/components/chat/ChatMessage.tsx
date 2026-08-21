/**
 * @fileoverview 개별 채팅 메시지 컴포넌트
 * @description 사용자 및 LLM 메시지 버블 스타일링과 타이핑 중인 로딩 표시를 담당하는 UI 컴포넌트입니다
 * @module components/chat/ChatMessage
 * @author KimsWeb
 * @created 2026-08-21
 */
import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  role?: 'user' | 'assistant';
  content?: string;
  model?: string;
  timestamp?: Date;
  isTypingPlaceholder?: boolean;
}

export function ChatMessage({
  role,
  content,
  model,
  timestamp,
  isTypingPlaceholder = false
}: ChatMessageProps) {
  
  // 1. AI 타이핑 중인 도트 홀더 렌더링
  if (isTypingPlaceholder) {
    return (
      <div className="flex gap-4 justify-start">
        <Avatar className="w-9 h-9 border border-gray-200 flex-shrink-0">
          <AvatarFallback className="bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-xs">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
    );
  }

  // 2. 일반 대화 말풍선 렌더링
  const isUser = role === 'user';
  
  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="w-9 h-9 border border-gray-200 flex-shrink-0">
          <AvatarFallback className="bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className="flex flex-col max-w-[80%] space-y-1">
        <div 
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser 
              ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-100'
              : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
          }`}
        >
          {content}
        </div>
        
        {timestamp && (
          <span className="text-[10px] text-gray-400 px-1">
            {model && <span className="font-semibold text-gray-500 mr-1.5">{model}</span>}
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {isUser && (
        <Avatar className="w-9 h-9 border border-gray-200 flex-shrink-0">
          <AvatarFallback className="bg-gray-800 text-white font-bold text-xs flex items-center justify-center">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
