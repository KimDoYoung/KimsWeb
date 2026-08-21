package kr.co.kalpa.kimsweb.repository;

import kr.co.kalpa.kimsweb.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * @fileoverview ChatRoomRepository Interface
 * @description ChatRoom 엔티티에 대한 데이터 액세스 처리를 담당하는 JpaRepository입니다
 * @module repository/ChatRoomRepository
 * @author KimsWeb
 * @created 2026-08-21
 */
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByUserIdOrderByLastMessageAtDesc(Long userId);
}
