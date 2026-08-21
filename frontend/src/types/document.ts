export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: 'uploading' | 'indexing' | 'completed' | 'failed';
}

export interface DocumentChunk {
  id: string;
  content: string;
  source: string;
  metadata: Record<string, any>;
}

export interface DocumentUploadRequest {
  file: File;
  metadata?: Record<string, any>;
}

export interface DocumentSearchResult {
  documents: DocumentChunk[];
  total: number;
}
