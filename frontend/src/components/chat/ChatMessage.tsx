import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-blue-500' : 'bg-gray-500'
        } text-white`}>
          {isUser ? '👤' : '🤖'}
        </div>
        <div className={`rounded-lg px-4 py-2 ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
        }`}>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
          {message.sources && message.sources.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              📚 출처: {message.sources.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
