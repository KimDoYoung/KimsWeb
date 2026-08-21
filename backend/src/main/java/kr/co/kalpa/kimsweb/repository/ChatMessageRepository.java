package kr.co.kalpa.kimsweb.repository;

import kr.co.kalpa.kimsweb.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * @fileoverview ChatMessageRepository Interface
 * @description ChatMessage 엔티티에 대한 데이터 액세스 처리를 담당하는 JpaRepository입니다
 * @module repository/ChatMessageRepository
 * @author KimsWeb
 * @created 2026-08-21
 */
@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatRoomIdOrderByCreatedAtAsc(Long chatRoomId);
}
