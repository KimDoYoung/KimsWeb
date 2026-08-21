/**
 * @fileoverview 채팅 메인 윈도우 컴포넌트
 * @description 웰컴 스크린/추천 퀵 카드 또는 대화 메시지 목록 스크롤 뷰포트를 표현하는 핵심 워크스페이스 컴포넌트입니다
 * @module components/chat/ChatWindow
 * @author KimsWeb
 * @created 2026-08-21
 */
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessage } from './ChatMessage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: Date;
}

interface Recommendation {
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface ChatWindowProps {
  messages: Message[];
  recommendations: Recommendation[];
  onRecommendClick: (text: string) => void;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  renderInput: React.ReactNode;
}

export function ChatWindow({
  messages,
  recommendations,
  onRecommendClick,
  isTyping,
  messagesEndRef,
  renderInput
}: ChatWindowProps) {
  
  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 max-w-3xl mx-auto w-full flex flex-col justify-between">
      {messages.length === 0 ? (
        
        /* 1. 최초 진입 웰컴 스크린 */
        <div className="flex flex-col items-center justify-center py-8 text-center my-auto max-w-2xl mx-auto w-full">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-md shadow-blue-100 border border-blue-100 animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            무엇을 도와드릴까요?
          </h1>
          <p className="text-gray-500 text-sm mb-8 max-w-md font-medium leading-relaxed">
            로컬 Qwen 2.5 및 수집된 문서를 기반으로 금융 지식 및 코딩 질문에 똑똑한 답을 드립니다.
          </p>

          {/* 중앙에 동적 임베딩된 입력창 */}
          <div className="w-full max-w-xl mb-8">
            {renderInput}
          </div>

          {/* 추천 퀵 카드 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {recommendations.map((rec, idx) => {
              const Icon = rec.icon;
              return (
                <Card 
                  key={idx}
                  onClick={() => onRecommendClick(rec.text)}
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

        /* 2. 대화 메시지 목록 */
        <div className="space-y-6 w-full flex-1">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              model={msg.model}
              timestamp={msg.timestamp}
            />
          ))}

          {/* AI 타이핑 애니메이션 효과 */}
          {isTyping && (
            <ChatMessage isTypingPlaceholder={true} />
          )}
          
          <div ref={messagesEndRef} />
        </div>

      )}
    </div>
  );
}
