import axiosInstance from '../utils/axios';
import { ChatRequest, ChatResponse, Message } from '../types/chat';

export const chatApi = {
  // 일반 채팅 (비스트리밍)
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await axiosInstance.post('/chat', request);
    return response.data;
  },

  // 대화 히스토리 조회
  getHistory: async (sessionId: string): Promise<Message[]> => {
    const response = await axiosInstance.get(`/chat/history/${sessionId}`);
    return response.data;
  },

  // 새 대화 세션 생성
  createSession: async (title: string): Promise<{ sessionId: string }> => {
    const response = await axiosInstance.post('/chat/session', { title });
    return response.data;
  },

  // SSE 스트리밍 URL 생성
  getStreamingUrl: (question: string, nResults: number = 5): string => {
    return `/api/rag/ask?question=${encodeURIComponent(question)}&nResults=${nResults}`;
  },
};
