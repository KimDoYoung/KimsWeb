/**
 * @fileoverview 공통 레이아웃 프레임 컴포넌트
 * @description 사이드바 및 메인 컨테이너 프레임을 구성하여 AI 챗 전반의 공간 구조를 정의합니다
 * @module components/common/Layout
 * @author KimsWeb
 * @created 2026-08-21
 */
import React from 'react';
import { Sparkles, PanelLeftClose, Plus, MessageSquare, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatRoom {
  id: string;
  title: string;
}

interface LayoutProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
  recentChats: ChatRoom[];
  onNewChat: () => void;
}

export function Layout({
  children,
  isSidebarOpen,
  onSidebarClose,
  recentChats,
  onNewChat
}: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* 사이드바 (Sidebar) */}
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
            onClick={onSidebarClose}
          >
            <PanelLeftClose className="w-5 h-5" />
          </Button>
        </div>

        {/* 새 채팅 버튼 */}
        <div className="p-3">
          <Button 
            onClick={onNewChat}
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
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors group relative cursor-pointer"
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
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold flex items-center justify-center">K</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">kdy987</p>
              <p className="text-xs text-gray-500 truncate">Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
        {children}
      </div>

    </div>
  );
}
