# 개인 프로젝트 - Calendiary

일기를 기록할 수 있는 달력. CRUD 구현.  
프론트엔드: React Framework 사용. Redux 사용하여 전역 상태 관리.
백엔드: node.js 사용 , 데이터베이스 : MYSQL

## 기능

1. 날짜에 따른 달력 렌더링
2. 달력의 특정 날짜에 일기 기록하기 (CREATE)
3. 일기 읽기 (READ)
4. 일기 내용 수정 (UPDATE)
5. 일기 삭제 (DELETE)
6. 로그인 / 회원가입 기능

## 테이블 구조(ERD)

![erd2](https://user-images.githubusercontent.com/39851220/168536880-5a599a3e-db54-429b-b015-b38deb75645b.PNG)

USERS 테이블

- user_id (Primary key) 유저아이디
- user_password 유저비밀번호
- user_name 유저이름
- createdAt 생성시간
- updatedAt 변경시간

DIARIES 테이블

- diary_id (Primary key) 일기 아이디
- diary_title 일기 제목
- diary_date 일기 날짜
- diary_text 일기 내용
- createdAt 생성시간
- updatedAt 변경시간
- user_id (Foreign key: user_id(USERS)) 일기 작성 유저 아이디

DIARY_ATTACHES 테이블

- file_id (Primary key) 파일 아이디
- file_name 파일 이름
- file_origin_name 파일 원본 이름
- file_path 파일 경로
- diary_id 첨부된 일기 아이디

## 커밋 컨벤션을 지켜보자

- feat (feature) : 기능 추가/수정 등
- fix (bug fix) : 버그 수정
- docs (documentation) : 문서 수정
- style (formatting, missing semi colons, …) : 스타일 변경 (형식, 세미콜론 누락 등)
- refactor : 리팩토링
- test (when adding missing tests) : 테스트
- chore (maintain) : 빌드, 패키지 관련 (업데이트 등)
