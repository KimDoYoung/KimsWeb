/**
 * @fileoverview 채팅 입력 필드 컴포넌트
 * @description 사용자의 텍스트 질문 입력 폼 및 전송 액션을 담당하는 UI 컴포넌트입니다
 * @module components/chat/ChatInput
 * @author KimsWeb
 * @created 2026-08-21
 */
import React from 'react';
import { Send, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  placeholder: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder
}: ChatInputProps) {
  return (
    <div className="w-full relative">
      <form 
        onSubmit={onSubmit}
        className="relative flex items-center bg-gray-50 border border-gray-200 focus-within:border-blue-500 rounded-2xl overflow-hidden px-4 py-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-100"
      >
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm text-gray-800 placeholder-gray-400 pr-12 min-h-[40px]"
        />
        <Button
          type="submit"
          disabled={disabled}
          size="icon"
          className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white w-9 h-9 rounded-xl flex items-center justify-center disabled:bg-gray-100 disabled:text-gray-300 transition-colors shadow-sm cursor-pointer"
        >
          <Send className="w-4.5 h-4.5" />
        </Button>
      </form>

      <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] text-gray-400 font-medium">
        <Info className="w-3.5 h-3.5 text-gray-300" />
        <span>AI 모델은 부정확한 정보를 출력할 수 있으므로 주요 사실은 별도 검증이 필요합니다.</span>
      </div>
    </div>
  );
}
