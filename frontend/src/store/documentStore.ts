import { create } from 'zustand';
import { Document, DocumentChunk } from '../types/document';

interface DocumentState {
  documents: Document[];
  selectedDocument: Document | null;
  searchResults: DocumentChunk[];
  isLoading: boolean;
  uploadProgress: number;

  // Actions
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  removeDocument: (documentId: string) => void;
  setSelectedDocument: (document: Document | null) => void;
  setSearchResults: (results: DocumentChunk[]) => void;
  setIsLoading: (loading: boolean) => void;
  setUploadProgress: (progress: number) => void;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: [],
  selectedDocument: null,
  searchResults: [],
  isLoading: false,
  uploadProgress: 0,

  setDocuments: (documents) => set({ documents }),
  
  addDocument: (document) => {
    set((state) => ({
      documents: [...state.documents, document]
    }));
  },
  
  removeDocument: (documentId) => {
    set((state) => ({
      documents: state.documents.filter(doc => doc.id !== documentId)
    }));
  },
  
  setSelectedDocument: (document) => set({ selectedDocument: document }),
  
  setSearchResults: (results) => set({ searchResults: results }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
}));
