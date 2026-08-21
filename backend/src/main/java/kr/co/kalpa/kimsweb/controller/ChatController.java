package kr.co.kalpa.kimsweb.controller;

import kr.co.kalpa.kimsweb.dto.ChatDto;
import kr.co.kalpa.kimsweb.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * @fileoverview ChatController
 * @description 대화방 개설, 대화방 목록 조회 및 메시지 히스토리 송수신 REST API 엔드포인트를 제공합니다
 * @module controller/ChatController
 * @author KimsWeb
 * @created 2026-08-21
 */
@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/rooms")
    public ResponseEntity<ChatDto.RoomResponse> createRoom(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId,
            @RequestBody ChatDto.RoomCreateRequest request
    ) {
        return ResponseEntity.ok(chatService.createRoom(userId, request));
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<ChatDto.RoomResponse>> getRooms(
            @RequestHeader(value = "X-User-Id", defaultValue = "1") Long userId
    ) {
        return ResponseEntity.ok(chatService.getRoomsByUser(userId));
    }

    @PostMapping("/rooms/{roomId}/messages")
    public ResponseEntity<ChatDto.MessageResponse> saveMessage(
            @PathVariable Long roomId,
            @RequestBody ChatDto.MessageSendRequest request
    ) {
        return ResponseEntity.ok(chatService.saveMessage(roomId, request));
    }

    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<List<ChatDto.MessageResponse>> getMessages(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatService.getMessagesByRoom(roomId));
    }
}
