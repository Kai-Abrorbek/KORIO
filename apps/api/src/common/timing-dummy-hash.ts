/**
 * 비밀번호가 없는 계정에도 bcrypt 를 한 번 돌리기 위한 가짜 해시.
 *
 * 계정이 없거나 비밀번호가 없을 때 바로 401 을 주면, 진짜 계정의 "비번 틀림"
 * 만 bcrypt 시간만큼 늦게 답한다. 응답 시간만 재도 어떤 이메일이 가입돼 있는지
 * (어드민이면 누가 어드민인지) 목록을 만들 수 있다.
 *
 * 버린 무작위 문자열의 해시라 어떤 입력과도 맞지 않고, 비밀도 아니다.
 * cost 는 실제로 저장하는 해시와 같아야 걸리는 시간이 같다.
 */
/** 앱 비밀번호와 같은 cost 10 */
export const TIMING_DUMMY_HASH =
  '$2b$10$Fs/n8shAiqXXVms9Iry8pOciWvV34BZiGhTXaKPC2tbwkjwJgpC3C';

/** 어드민 비밀번호(set-admin-password 스크립트)와 같은 cost 12 */
export const ADMIN_TIMING_DUMMY_HASH =
  '$2b$12$2G/ZbUn8SygZwMAqc0SqOOM49/F0uq2dL3qHBd4MmQb8UYWjjdXVi';
