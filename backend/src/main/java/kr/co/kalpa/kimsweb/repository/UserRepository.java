package kr.co.kalpa.kimsweb.repository;

import kr.co.kalpa.kimsweb.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * @fileoverview UserRepository Interface
 * @description User 엔티티에 대한 데이터 액세스 처리를 담당하는 JpaRepository입니다
 * @module repository/UserRepository
 * @author KimsWeb
 * @created 2026-08-21
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
