/**
 * @fileoverview 공통 헤더 컴포넌트
 * @description 사이드바 토글 및 AI 모델 드롭다운 전환기를 장착한 글로벌 상단바 컴포넌트입니다
 * @module components/common/Header
 * @author KimsWeb
 * @created 2026-08-21
 */
import { ChevronDown, Sparkles, Bot, PanelLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Model {
  id: string;
  name: string;
  desc: string;
}

interface HeaderProps {
  isSidebarOpen: boolean;
  onSidebarOpen: () => void;
  selectedModel: Model;
  onModelSelect: (model: Model) => void;
  models: Model[];
}

export function Header({
  isSidebarOpen,
  onSidebarOpen,
  selectedModel,
  onModelSelect,
  models
}: HeaderProps) {
  return (
    <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white/85 backdrop-blur-md z-10">
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:bg-gray-100 cursor-pointer"
            onClick={onSidebarOpen}
          >
            <PanelLeft className="w-5 h-5" />
          </Button>
        )}
        
        {/* 모델 선택 드롭다운 */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm cursor-pointer transition-colors outline-none">
            <Bot className="w-4 h-4 text-blue-500" />
            <span>{selectedModel.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 p-2 rounded-xl border border-gray-200 shadow-xl bg-white">
            {models.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => onModelSelect(model)}
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
  );
}
