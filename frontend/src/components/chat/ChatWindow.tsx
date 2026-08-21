import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/chatStore';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';

export const ChatWindow: React.FC = () => {
  const { messages, isLoading, isStreaming } = useChatStore();
  const { sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-lg">KimsWeb에 오신 것을 환영합니다!</p>
              <p className="text-sm">질문을 입력하시면 AI가 도와드립니다.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
                <span>AI가 답변을 생성 중...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
        isStreaming={isStreaming}
      />
    </div>
  );
};
