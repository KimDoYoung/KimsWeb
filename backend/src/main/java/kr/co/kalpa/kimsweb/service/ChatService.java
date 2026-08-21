package kr.co.kalpa.kimsweb.service;

import kr.co.kalpa.kimsweb.domain.ChatMessage;
import kr.co.kalpa.kimsweb.domain.ChatRoom;
import kr.co.kalpa.kimsweb.domain.User;
import kr.co.kalpa.kimsweb.dto.ChatDto;
import kr.co.kalpa.kimsweb.repository.ChatMessageRepository;
import kr.co.kalpa.kimsweb.repository.ChatRoomRepository;
import kr.co.kalpa.kimsweb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @fileoverview ChatService
 * @description 대화방 개설 및 메시지 로그 저장을 제어하는 채팅 도메인 서비스 컴포넌트입니다
 * @module service/ChatService
 * @author KimsWeb
 * @created 2026-08-21
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;

    @Transactional
    public ChatDto.RoomResponse createRoom(Long userId, ChatDto.RoomCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        ChatRoom room = ChatRoom.builder()
                .user(user)
                .title(request.title())
                .modelId(request.modelId())
                .lastMessageAt(LocalDateTime.now())
                .build();

        ChatRoom savedRoom = chatRoomRepository.save(room);
        return convertToRoomResponse(savedRoom);
    }

    public List<ChatDto.RoomResponse> getRoomsByUser(Long userId) {
        return chatRoomRepository.findByUserIdOrderByLastMessageAtDesc(userId).stream()
                .map(this::convertToRoomResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ChatDto.MessageResponse saveMessage(Long chatRoomId, ChatDto.MessageSendRequest request) {
        ChatRoom room = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new IllegalArgumentException("대화방을 찾을 수 없습니다."));

        ChatMessage message = ChatMessage.builder()
                .chatRoom(room)
                .role(request.role())
                .content(request.content())
                .modelName(request.modelName())
                .build();

        ChatMessage savedMsg = chatMessageRepository.save(message);

        // 대화방 마지막 대화 갱신
        room.setLastMessageAt(LocalDateTime.now());

        return convertToMessageResponse(savedMsg);
    }

    public List<ChatDto.MessageResponse> getMessagesByRoom(Long chatRoomId) {
        return chatMessageRepository.findByChatRoomIdOrderByCreatedAtAsc(chatRoomId).stream()
                .map(this::convertToMessageResponse)
                .collect(Collectors.toList());
    }

    private ChatDto.RoomResponse convertToRoomResponse(ChatRoom room) {
        return new ChatDto.RoomResponse(
                room.getId(),
                room.getUser() != null ? room.getUser().getId() : null,
                room.getTitle(),
                room.getModelId(),
                room.getLastMessageAt(),
                room.getCreatedAt()
        );
    }

    private ChatDto.MessageResponse convertToMessageResponse(ChatMessage msg) {
        return new ChatDto.MessageResponse(
                msg.getId(),
                msg.getChatRoom().getId(),
                msg.getRole(),
                msg.getContent(),
                msg.getModelName(),
                msg.getCreatedAt()
        );
    }
}
