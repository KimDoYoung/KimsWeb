package kr.co.kalpa.kimsweb.dto;

import java.time.LocalDateTime;

/**
 * @fileoverview Chat DTO Records
 * @description 대화방 개설 및 메시지 로그 송수신 데이터를 캡슐화한 DTO 파일입니다
 * @module dto/ChatDto
 * @author KimsWeb
 * @created 2026-08-21
 */
public final class ChatDto {

    private ChatDto() {}

    public record RoomCreateRequest(
        String title,
        String modelId
    ) {}

    public record RoomResponse(
        Long id,
        Long userId,
        String title,
        String modelId,
        LocalDateTime lastMessageAt,
        LocalDateTime createdAt
    ) {}

    public record MessageSendRequest(
        String content,
        String role,
        String modelName
    ) {}

    public record MessageResponse(
        Long id,
        Long chatRoomId,
        String role,
        String content,
        String modelName,
        LocalDateTime createdAt
    ) {}
}
