package kr.co.kalpa.kimsweb.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * @fileoverview User JPA Entity
 * @description 사용자(회원) 정보를 매핑하는 JPA 엔티티 클래스입니다
 * @schema kimsweb
 * @author KimsWeb
 * @created 2026-08-21
 */
@Entity
@Table(name = "users", schema = "kimsweb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "password_hash", nullable = false, length = 100)
    private String passwordHash;

    @Column(length = 100)
    private String email;

    @Column(length = 50)
    private String nickname;

    @Column(length = 20)
    @Builder.Default
    private String role = "ROLE_USER";

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
