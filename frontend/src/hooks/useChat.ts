import { useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { chatApi } from '../api/chatApi';
import { Message } from '../types/chat';

export const useChat = () => {
  const [isSending, setIsSending] = useState(false);
  const { addMessage, updateLastMessage, setIsStreaming, setIsLoading } = useChatStore();

  const sendMessage = async (question: string, nResults: number = 5) => {
    if (!question.trim()) return;

    setIsSending(true);
    setIsLoading(true);

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    // Assistant 응답을 위한 빈 메시지 추가
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    addMessage(assistantMessage);

    // SSE 스트리밍 시작
    const url = chatApi.getStreamingUrl(question, nResults);
    const eventSource = new EventSource(url);

    setIsStreaming(true);

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        eventSource.close();
        setIsStreaming(false);
        setIsLoading(false);
        setIsSending(false);
        return;
      }
      
      try {
        const data = JSON.parse(event.data);
        updateLastMessage(data);
      } catch {
        // 일반 텍스트인 경우
        updateLastMessage(event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      eventSource.close();
      setIsStreaming(false);
      setIsLoading(false);
      setIsSending(false);
      updateLastMessage('\n\n⚠️ 오류가 발생했습니다. 다시 시도해주세요.');
    };

    // 30초 타임아웃 설정
    const timeout = setTimeout(() => {
      if (eventSource.readyState !== EventSource.CLOSED) {
        eventSource.close();
        setIsStreaming(false);
        setIsLoading(false);
        setIsSending(false);
        updateLastMessage('\n\n⏰ 시간 초과. 다시 시도해주세요.');
      }
    }, 30000);

    // 클린업
    return () => {
      clearTimeout(timeout);
      eventSource.close();
    };
  };

  return { sendMessage, isSending };
};
