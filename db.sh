#!/usr/bin/env bash
#============================================================================
# db.sh - KimsWeb 데이터베이스 및 벡터 저장소 관리 안내 스크립트
#============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo -e ""
echo -e "${CYAN}${BOLD}══ KimsWeb Database & Vector Store Manager (개발 예정 안내) ══${NC}"
echo -e ""
echo -e "KimsWeb은 관계형 DB(PostgreSQL 17)와 벡터 DB(ChromaDB)를 동시 사용합니다."
echo -e "이 스크립트는 향후 아래 기능을 처리하기 위한 관리 도구로 개발될 예정입니다:"
echo -e ""
echo -e "  ${GREEN}1.${NC} ${BOLD}PostgreSQL 스키마 및 마이그레이션 관리${NC} (Liquibase / Flyway 연계)"
echo -e "  ${GREEN}2.${NC} ${BOLD}ChromaDB 벡터 인덱스 초기화 및 백업${NC}"
echo -e "  ${GREEN}3.${NC} ${BOLD}RAG용 문서 청킹 임베딩 배치 트리거${NC}"
echo -e "  ${GREEN}4.${NC} ${BOLD}로컬 캐시(Redis) 클리어${NC}"
echo -e ""
echo -e "--------------------------------------------------------"
echo -e "${YELLOW}[참고]${NC} 현재 PostgreSQL과 ChromaDB는 로컬 혹은 Docker 환경에 설치되어 구동 중이어야 하며,"
echo -e "       접속 정보는 \`backend/src/main/resources/application-local.properties\`에서 관리됩니다."
echo -e "       향후 CLI 환경에서 DB를 빠르게 초기화하거나 백업하는 로직을 이곳에 구현할 예정입니다."
echo -e ""
