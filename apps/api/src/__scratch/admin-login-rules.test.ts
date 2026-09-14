/**
 * 어드민 문에 관한 규칙 두 가지.
 *
 * 둘 다 **손으로 테스트하면 멀쩡해 보이는** 종류라 여기 박아둔다:
 *   · CORS: curl 은 Origin 을 안 보낸다. 브라우저만 보낸다.
 *   · 비밀번호: 소셜 가입 계정은 `password` 가 없어서, 앱 비밀번호를 기준으로
 *     짜면 "계정은 있는데 로그인만 안 되는" 상태가 된다.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

/** main.ts 와 **같은 정규식**이어야 한다. 바꾸면 여기도 같이 바꿔라 */
const LOCALHOST = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

test('개발에서 자동 허용되는 오리진', () => {
  for (const ok of [
    'http://localhost:3100', // 어드민 dev
    'http://localhost:3002', // telegram-app dev
    'http://localhost:3000',
    'http://127.0.0.1:3100',
    'https://localhost:3100',
    'http://localhost',
    'http://[::1]:3100',
  ]) {
    assert.equal(LOCALHOST.test(ok), true, `허용돼야 한다: ${ok}`);
  }
});

test('localhost 처럼 생긴 남의 도메인은 막힌다', () => {
  for (const bad of [
    'http://localhost.evil.com',
    'http://evil.com/localhost',
    'https://notlocalhost:3100',
    'http://127.0.0.1.evil.com',
    'http://localhost:3100.evil.com',
    'https://korio.online',
  ]) {
    assert.equal(LOCALHOST.test(bad), false, `막혀야 한다: ${bad}`);
  }
});

/** admin-auth.service 의 판정과 같은 모양 */
const canLogin = (u: { adminPassword?: string | null; adminRole?: string | null }) =>
  !!u.adminPassword && !!u.adminRole;

test('소셜 가입 계정도 admin:password 만 넣으면 들어온다', () => {
  // 소셜 가입: password 가 아예 없다
  assert.equal(canLogin({ adminRole: 'super_admin' }), false);
  assert.equal(canLogin({ adminRole: 'super_admin', adminPassword: '$2b$12$...' }), true);
});

test('비밀번호만 있고 권한이 없으면 못 들어온다', () => {
  assert.equal(canLogin({ adminPassword: '$2b$12$...' }), false);
  assert.equal(canLogin({ adminPassword: '$2b$12$...', adminRole: null }), false);
});
