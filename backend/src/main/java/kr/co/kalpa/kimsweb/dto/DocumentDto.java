package kr.co.kalpa.kimsweb.dto;

import java.time.LocalDateTime;

/**
 * @fileoverview Document DTO Records
 * @description 문서 업로드 이력 및 RAG 파싱 상태 데이터를 캡슐화한 DTO 파일입니다
 * @module dto/DocumentDto
 * @author KimsWeb
 * @created 2026-08-21
 */
public final class DocumentDto {

    private DocumentDto() {}

    public record MetaResponse(
        Long id,
        Long userId,
        String fileName,
        Long fileSize,
        String status,
        String errorMessage,
        LocalDateTime createdAt
    ) {}

    public record StatusUpdateRequest(
        String status,
        String errorMessage
    ) {}
}
