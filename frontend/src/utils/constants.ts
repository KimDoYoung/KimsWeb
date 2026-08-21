export const API_ENDPOINTS = {
  CHAT: '/chat',
  DOCUMENTS: '/documents',
  AUTH: '/auth',
  RAG: '/rag',
} as const;

export const STREAMING = {
  SSE: '/api/rag/ask',
  WEBSOCKET: '/ws/chat',
} as const;

export const DEFAULT_CONFIG = {
  MAX_MESSAGE_LENGTH: 4000,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  CHUNK_SIZE: 500,
  N_RESULTS: 5,
} as const;

export const SUPPORTED_FILE_TYPES = [
  '.pdf', '.docx', '.txt', '.md', 
  '.py', '.java', '.sh', '.json', 
  '.yaml', '.yml', '.xml'
] as const;
