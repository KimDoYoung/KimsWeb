# KimsWeb 헬스체크 및 시스템 정보 API 구현 계획서

이 계획서는 KimsWeb 백엔드에 애플리케이션의 현재 구동 상태 및 버전을 리턴하는 `/api/health` API를 개발하고, 해당 API가 Spring Security 필터를 통과하도록 설정하는 구현 계획서입니다.

---

## 🎯 목표 (Goal)
- **헬스체크 API 구현**: `spring.application.version` 설정값을 주입받아 버전 정보를 응답하는 헬스체크 컨트롤러를 생성합니다.
- **Spring Security 설정 적용**: `/api/health` 호출 시 로그인 인증 또는 JWT 토큰 검증 없이 직접 응답을 수집할 수 있도록 Security 허용 필터를 구축합니다.

---

## 🛠️ 제안된 변경 사항 (Proposed Changes)

### 1. 버전 설정 추가 [MODIFY]

#### [application.properties](file:///home/kdy987/work/KimsWeb/backend/src/main/resources/application.properties)
* `spring.application.version` 기본 설정값을 추가합니다.

```properties
spring.application.version=1.0.0
```

---

### 2. Spring Security 설정 클래스 작성 [NEW]

#### [NEW] [SecurityConfig.java](file:///home/kdy987/work/KimsWeb/backend/src/main/java/kr/co/kalpa/kimsweb/config/SecurityConfig.java)
* `/api/health` 경로를 `permitAll()`으로 허용하고 CSRF 등을 비활성화하는 기본 Security 설정을 정의합니다.

```java
package kr.co.kalpa.kimsweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/health").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
```

---

### 3. SystemInfoController 작성 [NEW]

#### [NEW] [SystemInfoController.java](file:///home/kdy987/work/KimsWeb/backend/src/main/java/kr/co/kalpa/kimsweb/controller/SystemInfoController.java)
* `/api/health` 경로 매핑을 생성하고 상태와 버전을 담은 Map을 JSON 형태로 반환합니다.

```java
package kr.co.kalpa.kimsweb.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SystemInfoController {

    @Value("${spring.application.version:1.0.0}")
    private String version;

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("version", version);
        return status;
    }
}
```

---

## 🧪 검증 계획 (Verification Plan)

### 수동 검증 (Manual Verification)
1. **백엔드 빌드**:
   ```bash
   bash bm.sh compile
   ```
2. **백엔드 기동**:
   ```bash
   bash bm.sh run
   ```
3. **API 응답 수집**:
   ```bash
   curl -i http://localhost:8080/api/health
   ```
   * HTTP 200 OK 응답 및 `{"status":"UP","version":"1.0.0"}` JSON 결과가 인증 헤더나 세션 없이 수집되는지 확인합니다.
