package kr.co.kalpa.kimsweb.service;

import kr.co.kalpa.kimsweb.domain.Document;
import kr.co.kalpa.kimsweb.domain.User;
import kr.co.kalpa.kimsweb.dto.DocumentDto;
import kr.co.kalpa.kimsweb.repository.DocumentRepository;
import kr.co.kalpa.kimsweb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @fileoverview DocumentService
 * @description RAG 학습 문서 등록 및 상태 갱신 비즈니스 로직을 처리하는 서비스 컴포넌트입니다
 * @module service/DocumentService
 * @author KimsWeb
 * @created 2026-08-21
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    @Transactional
    public DocumentDto.MetaResponse registerDocument(Long userId, String fileName, String filePath, Long fileSize) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("올바르지 않은 사용자 고유번호입니다."));

        Document document = Document.builder()
                .user(user)
                .fileName(fileName)
                .filePath(filePath)
                .fileSize(fileSize)
                .build();

        Document savedDoc = documentRepository.save(document);
        return convertToResponse(savedDoc);
    }

    @Transactional
    public DocumentDto.MetaResponse updateStatus(Long documentId, DocumentDto.StatusUpdateRequest request) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new IllegalArgumentException("문서를 찾을 수 없습니다."));

        document.setStatus(request.status());
        document.setErrorMessage(request.errorMessage());
        
        return convertToResponse(document);
    }

    public List<DocumentDto.MetaResponse> getDocumentsByUser(Long userId) {
        return documentRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private DocumentDto.MetaResponse convertToResponse(Document doc) {
        return new DocumentDto.MetaResponse(
                doc.getId(),
                doc.getUser() != null ? doc.getUser().getId() : null,
                doc.getFileName(),
                doc.getFileSize(),
                doc.getStatus(),
                doc.getErrorMessage(),
                doc.getCreatedAt()
        );
    }
}
