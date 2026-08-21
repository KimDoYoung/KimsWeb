package kr.co.kalpa.kimsweb.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * @fileoverview ChatRoom JPA Entity
 * @description 채팅방(대화 세션) 정보를 매핑하는 JPA 엔티티 클래스입니다
 * @schema kimsweb
 * @author KimsWeb
 * @created 2026-08-21
 */
@Entity
@Table(name = "chat_rooms", schema = "kimsweb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "model_id", nullable = false, length = 50)
    private String modelId;

    @Column(name = "last_message_at")
    private LocalDateTime lastMessageAt;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
