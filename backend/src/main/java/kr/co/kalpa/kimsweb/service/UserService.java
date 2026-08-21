package kr.co.kalpa.kimsweb.service;

import kr.co.kalpa.kimsweb.domain.User;
import kr.co.kalpa.kimsweb.dto.UserDto;
import kr.co.kalpa.kimsweb.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @fileoverview UserService
 * @description 회원 가입 및 조회 로직을 통합 관리하는 서비스 컴포넌트입니다
 * @module service/UserService
 * @author KimsWeb
 * @created 2026-08-21
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserDto.Response signUp(UserDto.SignUpRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 사용자 아이디입니다.");
        }

        // TODO: 향후 Spring Security BCryptPasswordEncoder 연동 시 비밀번호 해시 암호화 적용
        User user = User.builder()
                .username(request.username())
                .passwordHash(request.password()) // 임시 평문 저장
                .email(request.email())
                .nickname(request.nickname())
                .build();

        User savedUser = userRepository.save(user);
        return convertToResponse(savedUser);
    }

    public UserDto.Response getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return convertToResponse(user);
    }

    public UserDto.Response getByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return convertToResponse(user);
    }

    private UserDto.Response convertToResponse(User user) {
        return new UserDto.Response(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getNickname(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
