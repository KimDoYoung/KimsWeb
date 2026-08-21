# KimsWeb 개발 가이드라인 (GEMINI.md)

이 문서는 Antigravity AI가 KimsWeb 프로젝트를 이해하고, 일관된 스타일과 원칙으로 개발을 진행하기 위한 규칙 문서입니다.

---

## 🚀 빌드 및 실행 명령어

개발 과정에서 사용하는 주요 스크립트는 다음과 같습니다.

* **백엔드 빌드 및 컴파일**: `bash bm.sh` (Gradle 기반 Backend 컴파일/빌드 수행)
* **프론트엔드 실행**: `bash fm.sh` (React/Vite 개발 서버 실행)
* **통합 배포**: `bash deploy.sh` (Backend와 Frontend를 병합하여 단일 `.war` 파일을 생성하고 지정된 Tomcat 폴더에 배포)

---

## 🔒 보안 및 설정 관리 원칙

* **공통 설정**: `src/main/resources/application.properties` 파일에 비민감 정보를 정의합니다.
* **민감 정보 관리**:
  * 각 환경별 민감 정보는 `application-<profile>.properties` 형식(예: `application-local.properties`, `application-dev.properties`)으로 관리합니다.
  * **중요**: 환경별 설정 파일(`application-*.properties`)은 절대 Git에 커밋하지 않고 로컬에서만 유지합니다. (이미 `.gitignore`에 등록됨)
  * 실행 시 시스템 프로퍼티 `SPRING_PROFILES_ACTIVE=<profile>`을 통해 설정을 관리합니다.

---

## 🗄️ 데이터 및 디렉토리 관리 규칙

* **기본 경로 제한**: 파일 저장 및 작업 시 반드시 `kimsweb.base-dir` 프로퍼티에서 지정한 폴더와 그 이하의 하위 폴더만 사용합니다.
* **데이터 저장소 구성**:
  * **PostgreSQL (17.x)**: 사용자 정보, 계좌 정보, 문서 메타데이터, 대화 이력 등 정형 데이터 저장
  * **ChromaDB**: 문서 청크 임베딩 및 질문 벡터 데이터 저장 (RAG 검색용)
  * **Redis (7.4.x)**: JWT 세션 및 API 응답 캐싱
  * **File System**: 업로드된 원본 문서(PDF, Word 등) 파일 저장

---

## 🛠️ 기술 스택 및 개발 스타일

* **Backend**:
  * Java 21 (LTS) 및 Spring Boot 3.4.x 기반
  * Spring WebFlux를 이용한 SSE(Server-Sent Events) 스트리밍 응답 구현
  * Spring AI 1.0.x를 활용하여 Ollama(로컬 Qwen2.5:14b 및 nomic-embed-text) 및 ChromaDB 연동
  * 데이터 영속성은 Spring Data JPA 3.4.x를 주로 사용하며, 복잡한 금융 데이터 처리가 필요한 경우에는 MyBatis 3.5.x 사용
* **Frontend**:
  * React 19.2.x 및 TypeScript 5.7.x 기반 (Vite 6.x)
  * UI 스타일링은 Tailwind CSS 4.1.x 및 shadcn/ui 사용
  * 전역 상태 관리는 Zustand, 서버 상태 관리는 TanStack Query 사용
  * 데이터 그리드는 AG Grid Community 34.3.x를 활용하여 계좌 및 주식 정보 표현
