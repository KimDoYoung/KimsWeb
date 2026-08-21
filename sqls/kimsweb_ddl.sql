-- ============================================
-- @fileoverview KimsWeb 데이터베이스 스키마 DDL
-- @description 사용자 정보, RAG 문서 관리, 채팅방 세션 및 메시지 이력을 관리하는 테이블 구조 정의
-- @schema kimsweb
-- @author KimsWeb
-- @created 2026-08-21
-- ============================================

-- 스키마 생성
CREATE SCHEMA IF NOT EXISTS kimsweb;

-- 1. 사용자 테이블 (kimsweb.users)
CREATE TABLE kimsweb.users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    nickname VARCHAR(50),
    role VARCHAR(20) DEFAULT 'ROLE_USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. 문서 메타데이터 테이블 (kimsweb.documents)
CREATE TABLE kimsweb.documents (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES kimsweb.users(id) ON DELETE SET NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    file_size BIGINT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING, PROCESSING, COMPLETED, FAILED
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_documents_status ON kimsweb.documents(status);

-- 3. 대화방 테이블 (kimsweb.chat_rooms)
CREATE TABLE kimsweb.chat_rooms (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES kimsweb.users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    model_id VARCHAR(50) NOT NULL,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. 대화 메시지 테이블 (kimsweb.chat_messages)
CREATE TABLE kimsweb.chat_messages (
    id BIGSERIAL PRIMARY KEY,
    chat_room_id BIGINT REFERENCES kimsweb.chat_rooms(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- user, assistant
    content TEXT NOT NULL,
    model_name VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_chat_messages_room ON kimsweb.chat_messages(chat_room_id);
