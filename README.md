# KimsWeb

## 개요

- local LLM 을 위한 RAG시스템

## 기술스택

- docs/기술스택.md 참조


## 개발원칙

- application.properties 를 사용
- kimsweb.base-dir 에서 지정한 폴더와 그 이하의 폴더를 사용함.
- 민감정보는 다음과 같이 관리한다.
```text
src/main/resources/
├── application.properties          # 공통 설정 (비민감 정보)
├── application-<profile>.properties      # 개발 환경 (민감 정보 포함, .gitignore)
```
- SPRING_PROFILES_ACTIVE=<profile> 로 설정 관리