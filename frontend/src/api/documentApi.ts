import axiosInstance from '../utils/axios';
import { Document, DocumentUploadRequest, DocumentSearchResult } from '../types/document';

export const documentApi = {
  // 문서 업로드
  upload: async (file: File, metadata?: Record<string, any>): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    
    const response = await axiosInstance.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 문서 목록 조회
  getList: async (): Promise<Document[]> => {
    const response = await axiosInstance.get('/documents');
    return response.data;
  },

  // 문서 삭제
  delete: async (documentId: string): Promise<void> => {
    await axiosInstance.delete(`/documents/${documentId}`);
  },

  // 문서 검색
  search: async (query: string, limit: number = 10): Promise<DocumentSearchResult> => {
    const response = await axiosInstance.get(`/documents/search?query=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data;
  },
};
