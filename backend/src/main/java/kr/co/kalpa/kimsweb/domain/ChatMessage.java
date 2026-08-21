package kr.co.kalpa.kimsweb.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * @fileoverview ChatMessage JPA Entity
 * @description 대화방 내 낱개 메시지 히스토리를 매핑하는 JPA 엔티티 클래스입니다
 * @schema kimsweb
 * @author KimsWeb
 * @created 2026-08-21
 */
@Entity
@Table(name = "chat_messages", schema = "kimsweb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id", nullable = false)
    private ChatRoom chatRoom;

    @Column(nullable = false, length = 20)
    private String role; // user, assistant

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "model_name", length = 50)
    private String modelName;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
