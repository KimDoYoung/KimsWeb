package kr.co.kalpa.kimsweb.repository;

import kr.co.kalpa.kimsweb.domain.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * @fileoverview DocumentRepository Interface
 * @description Document 엔티티에 대한 데이터 액세스 처리를 담당하는 JpaRepository입니다
 * @module repository/DocumentRepository
 * @author KimsWeb
 * @created 2026-08-21
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByUserIdOrderByCreatedAtDesc(Long userId);
}
