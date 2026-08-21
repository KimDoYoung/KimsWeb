package kr.co.kalpa.kimsweb.dto;

import java.time.LocalDateTime;

/**
 * @fileoverview User DTO Records
 * @description 사용자 관련 요청 및 응답 데이터를 불변 record 형태로 캡슐화한 DTO 파일입니다
 * @module dto/UserDto
 * @author KimsWeb
 * @created 2026-08-21
 */
public final class UserDto {

    private UserDto() {}

    public record SignUpRequest(
        String username,
        String password,
        String email,
        String nickname
    ) {}

    public record Response(
        Long id,
        String username,
        String email,
        String nickname,
        String role,
        LocalDateTime createdAt
    ) {}
}
