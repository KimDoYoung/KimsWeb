# KimsWeb 백엔드 CRUD 패키지 및 뼈대 구축 계획서

이 계획서는 앞서 데이터베이스 스키마로 설계한 4종의 엔티티(User, Document, ChatRoom, ChatMessage)를 대상으로 백엔드(Spring Boot 3.4.x)의 JPA Entity, Repository, DTO, Service, Controller 계층을 완전하게 구축하는 작업 계획서입니다.

---

## 🎯 목표 (Goal)
- **표준 JPA 계층 구조 구축**: 데이터베이스의 `kimsweb` 스키마 테이블들과 일대일로 대치되는 JPA Entity를 모델링하고 관계성(User -> Document/ChatRoom, ChatRoom -> ChatMessage)을 선언합니다.
- **DTO를 통한 API 격리**: 비즈니스 내부 엔티티가 외부에 직접 노출되지 않도록 전용 Request/Response DTO를 작성하여 API 통신 보안 및 안정성을 강화합니다.
- **Rest API 컨트롤러 구축**: 프론트엔드가 호출할 수 있는 회원 정보, 문서 상태 조회, 채팅방 생성 및 메시지 영속성 CRUD API를 제공합니다.

---

## 📐 패키지 설계 및 클래스 명세

`kr.co.kalpa.kimsweb` 패키지 하위에 다음과 같은 구조로 생성합니다:

```text
kr.co.kalpa.kimsweb
├── domain (JPA Entities)
│   ├── User.java
│   ├── Document.java
│   ├── ChatRoom.java
│   └── ChatMessage.java
├── repository (Spring Data JPA Repositories)
│   ├── UserRepository.java
│   ├── DocumentRepository.java
│   ├── ChatRoomRepository.java
│   └── ChatMessageRepository.java
├── dto (Data Transfer Objects)
│   ├── UserDto.java
│   ├── DocumentDto.java
│   └── ChatDto.java
├── service (Business Services)
│   ├── UserService.java
│   ├── DocumentService.java
│   └── ChatService.java
└── controller (REST Controllers)
    ├── UserController.java
    ├── DocumentController.java
    └── ChatController.java
```

---

## 🛠️ 주요 컴포넌트 구현 계획

### 1. JPA Entities (domain)
* `@Table(name = "...", schema = "kimsweb")`을 적용하여 원격 스키마에 올바르게 연동합니다.
* 다대일(`@ManyToOne`), 일대다(`@OneToMany`) 연관 관계 매핑 시 무한 순환 참조(Circular Reference) 방지를 위해 DTO 변환 처리를 철저히 고수합니다.

### 2. DTOs (dto)
* 자바 14+의 `record` 키워드를 활용하거나 표준 클래스 형태로 경량의 불변 DTO를 구현합니다.
* 예: `record UserResponse(Long id, String username, String nickname)` 등.

### 3. Services (service)
* `@Transactional`을 적용하여 데이터 변경 시 일관된 커밋/롤백 메커니즘을 적용합니다.
* `UserService`: 회원 생성 및 조회
* `DocumentService`: 문서 업로드 이력 적재 및 변환 상태(PROCESSING -> COMPLETED) 업데이트
* `ChatService`: 신규 대화방 개설, 대화방 조회, 메시지 송수신 로그 영속화

---

## 🧪 검증 계획 (Verification Plan)

### 수동 검증 (Manual Verification)
1. **백엔드 컴파일 확인**:
   ```bash
   bash bm.sh compile
   ```
   * 15개 이상의 신규 파일 추가 및 연관 관계 참조 상에 컴파일 오류가 없는지 검증합니다.
2. **백엔드 구동 및 API 기능 테스트**:
   * `bash bm.sh run`을 통해 서버를 실행합니다.
   * `curl` 명령을 이용해 회원 가입(`POST /api/users`), 대화방 개설(`POST /api/chats/rooms`), 메시지 기록(`POST /api/chats/rooms/{id}/messages`) 등의 API가 실제로 동작하고 원격 `jskn` 데이터베이스 테이블에 데이터가 저장되는지 확인합니다.
