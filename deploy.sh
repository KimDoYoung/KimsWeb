#!/usr/bin/env bash
#============================================================================
# deploy.sh - KimsWeb 배포 안내 및 템플릿 스크립트
#============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo -e ""
echo -e "${CYAN}${BOLD}══ KimsWeb 배포 파이프라인 (기반 환경 안내) ══${NC}"
echo -e ""
echo -e "이 스크립트는 향후 자동화 배포 파이프라인을 구축할 때 사용됩니다."
echo -e "현재 구성된 통합 배포 로직 흐름은 아래와 같습니다:"
echo -e ""
echo -e "  ${GREEN}1.${NC} ${BOLD}Frontend 빌드${NC}: \`cd frontend && npm run build\`"
echo -e "  ${GREEN}2.${NC} ${BOLD}자원 동기화${NC}: 프론트 빌드 결과물(\`dist/*\`)을 백엔드 정적 리소스 경로"
echo -e "     (\`backend/src/main/resources/static/\`)로 복사합니다."
echo -e "  ${GREEN}3.${NC} ${BOLD}Backend 패키징${NC}: \`cd backend && ./gradlew bootWar\`"
echo -e "  ${GREEN}4.${NC} ${BOLD}Tomcat 배포${NC}: 생성된 \`kimsweb.war\`를 지정된 Tomcat의 \`webapps/ROOT.war\`로 복사"
echo -e ""
echo -e "${YELLOW}[안내]${NC} 배포 프로세스를 자동으로 구동하려면 스크립트 하단의 주석을 해제하거나"
echo -e "       환경변수 \`TOMCAT_HOME\`을 설정해 주세요."
echo -e "       예: export TOMCAT_HOME=/path/to/tomcat && ./deploy.sh"
echo -e ""
echo -e "--------------------------------------------------------"

# --- 실제 배포 파이프라인 (활성화 시 아래 주석 해제) ---
# BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
# 
# echo "1. 빌드 준비 및 프론트엔드 빌드..."
# cd "$BASE_DIR/frontend" && npm install && npm run build
# 
# echo "2. 백엔드 정적 경로 동기화..."
# rm -rf "$BASE_DIR/backend/src/main/resources/static/*"
# mkdir -p "$BASE_DIR/backend/src/main/resources/static"
# cp -r dist/* "$BASE_DIR/backend/src/main/resources/static/"
# 
# echo "3. 백엔드 WAR 빌드..."
# cd "$BASE_DIR/backend" && ./gradlew clean bootWar
# 
# echo "4. Tomcat 복사..."
# WAR_FILE="$BASE_DIR/backend/build/libs/kimsweb.war"
# if [ -f "$WAR_FILE" ] && [ ! -z "${TOMCAT_HOME:-}" ]; then
#     cp "$WAR_FILE" "$TOMCAT_HOME/webapps/ROOT.war"
#     echo "배포 완료!"
# else
#     echo "TOMCAT_HOME이 없거나 WAR 빌드가 완료되지 않아 파일 복사를 생략합니다."
# fi
