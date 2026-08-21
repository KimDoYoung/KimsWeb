# KimsWeb 원격 ChromaDB 구축 및 연동 구현 계획서 (완료)

이 계획서는 로컬 개발의 일관성과 통일성을 위해, 원격 `jskn` 서버(도메인: `jskn.iptime.org`)의 Docker Compose 인프라에 `ChromaDB` 컨테이너를 추가 배포하고, 로컬 백엔드의 접속 정보 역시 원격 ChromaDB를 가리키도록 설정하여 최종적으로 백엔드를 구동하는 계획입니다.

---

## 🎯 목표 (Goal)
- **원격 ChromaDB 배포**: 원격 `jskn` 서버의 `/data/docker/docker-compose.yml`을 수정하여 ChromaDB 서비스를 신규 추가하고 배포합니다. (사용자가 원격에 배포 완료)
- **ChromaDB API 버전 호환성 해결 (410 Gone)**: `chromadb:latest` 버전은 v1 API가 제거되어 Spring AI 1.0.0-M1 클라이언트와 호환되지 않는 버그가 확인되었습니다. 따라서 Spring AI 버전을 `1.0.0-M2`로 업그레이드하여 호환성을 확보합니다. (완료)
- **연동 주소 갱신**: 로컬 백엔드 프로필(`application-local.properties`)의 ChromaDB 클라이언트 호스트를 `http://jskn.iptime.org`로 변경하여 모든 데이터 저장소(PostgreSQL, Redis, ChromaDB)를 `jskn` 서버로 단일화합니다. (완료)
- **백엔드 기동 정상화**: 저장소 인프라 연동이 모두 해결되어 `./bm.sh run`을 통해 백엔드가 완전히 로드되는지 확인합니다. (완료)

---

## 🔒 사용자 검토 필요 사항 (User Review Required)
> [!IMPORTANT]
> - **Spring AI 1.0.0-M2 업그레이드 성공**: Spring AI 버전을 `1.0.0-M2`로 업그레이드함으로써 최신 ChromaDB의 v2 API가 완벽하게 호환되며, 기존의 Spring Cloud Function 충돌 문제 우회를 위해 임시 추가했던 exclude 코드를 모두 삭제하고 깨끗한 표준 스펙 상태로 되돌렸습니다.

---

## 🛠️ 제안된 변경 사항 (Proposed Changes)

### 1. `build.gradle` 수정 [MODIFY] (완료)
* `springAiVersion`을 `1.0.0-M2`로 변경하여 ChromaDB v2 및 의존성 정합성을 맞춥니다.

### 2. 백엔드 시작 클래스 원복 [MODIFY] (완료)
* `KimsWebApplication.java`에서 불필요해진 `excludeName` 설정을 삭제하고 표준 구성으로 되돌렸습니다.

---

## 🧪 검증 계획 및 수행 결과 (Verification & Results)

1. **원격 저장소 연동 검증 (성공)**:
   * 로컬에서 원격 `jskn.iptime.org` 서버의 `5432`(PostgreSQL), `6379`(Redis), `8000`(ChromaDB) 포트로의 접속이 모두 소켓 레벨 및 라이브러리 레벨에서 성공함을 확인했습니다.
2. **백엔드 최종 구동 (성공)**:
   * `bash bm.sh run` 기동 결과, 아무런 예외 없이 3.94초 만에 내장 Tomcat이 정상 구동되어 `8080` 포트에 안전하게 바이딩되었습니다.
   ```text
   Tomcat started on port 8080 (http) with context path '/'
   Started KimsWebApplication in 3.94 seconds
   ```
