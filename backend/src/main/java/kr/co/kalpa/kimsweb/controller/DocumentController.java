package kr.co.kalpa.kimsweb.controller;

import kr.co.kalpa.kimsweb.dto.DocumentDto;
import kr.co.kalpa.kimsweb.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * @fileoverview DocumentController
 * @description RAG 전용 문서 메타데이터 조회 및 파싱 상태 갱신 REST API 엔드포인트를 제공합니다
 * @module controller/DocumentController
 * @author KimsWeb
 * @created 2026-08-21
 */
@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping
    public ResponseEntity<List<DocumentDto.MetaResponse>> getDocuments(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId
    ) {
        return ResponseEntity.ok(documentService.getDocumentsByUser(userId));
    }

    @PostMapping("/register")
    public ResponseEntity<DocumentDto.MetaResponse> registerDocument(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId,
            @RequestParam String fileName,
            @RequestParam String filePath,
            @RequestParam Long fileSize
    ) {
        return ResponseEntity.ok(documentService.registerDocument(userId, fileName, filePath, fileSize));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<DocumentDto.MetaResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody DocumentDto.StatusUpdateRequest request
    ) {
        return ResponseEntity.ok(documentService.updateStatus(id, request));
    }
}
