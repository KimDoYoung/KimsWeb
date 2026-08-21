import { create } from 'zustand';
import { Message, ChatSession } from '../types/chat';

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  
  // Actions
  setSessions: (sessions: ChatSession[]) => void;
  setCurrentSession: (sessionId: string) => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  setIsLoading: (loading: boolean) => void;
  setIsStreaming: (streaming: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [],
  currentSessionId: null,
  messages: [],
  isLoading: false,
  isStreaming: false,

  setSessions: (sessions) => set({ sessions }),
  
  setCurrentSession: (sessionId) => set({ currentSessionId: sessionId }),
  
  addMessage: (message) => {
    const { messages } = get();
    set({ messages: [...messages, message] });
  },
  
  updateLastMessage: (content) => {
    const { messages } = get();
    if (messages.length === 0) return;
    
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'assistant') {
      const updatedMessages = [
        ...messages.slice(0, -1),
        { ...lastMessage, content: lastMessage.content + content }
      ];
      set({ messages: updatedMessages });
    }
  },
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsStreaming: (streaming) => set({ isStreaming: streaming }),
  clearMessages: () => set({ messages: [] }),
}));
