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

## 개발 툴

- 개발과정에서 사용한다.
- bm.sh - gradle베이스로 backend compile, build 수행
- fm.sh - frontend 실행
- deploy.sh - backend와 frontend를 merge해서 1개의 war로 만들어서 정해진 tomcat 폴더에 배포한다.


## 폴더들

- backend : springboot, java 베이스의 backend
- frontend : react 베이스의 frontend
- docs : 문서들
- scripts : RAG를 위한 문서 수집 python, shell scripts
