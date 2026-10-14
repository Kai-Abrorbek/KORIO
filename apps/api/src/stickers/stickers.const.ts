import { runtimeConfig } from '../app-settings/runtime-values';

/**
 * 내 캐릭터 텔레그램 스티커팩 — 보석으로 산다.
 *
 * 서버가 캐릭터를 8가지 표정·한국어 한마디로 그려서(art/) 봇이 텔레그램 스티커 세트를
 * 유저 이름으로 만든다. 캐릭터를 바꾸면 조금 내고 같은 세트를 새 그림으로 바꾼다 —
 * 이미 세트를 추가해 둔 사람(친구 포함)에게도 바뀐 그림이 보인다.
 *
 * 2026-10-14 부터 **무료**(0). 앱은 값이 0 이면 "무료로 만들기" 로 그린다.
 * 다시 팔 때 기준 (1 보석 = 1 so'm): 처음 4,000 · 다시 그리기 500.
 * 어드민 "앱 숫자 설정" 에서 바꿀 수 있다 (STICKER_PACK.price · refreshPrice).
 */
export const STICKER_PACK = runtimeConfig('STICKER_PACK', {
  /** 처음 만들 때 */
  price: 0,
  /** 캐릭터를 바꾸고 다시 만들 때 */
  refreshPrice: 0,
});

/** 표가 살아 있는 시간 — 텔레그램 열고 START 누르기까지 */
export const STICKER_LINK_TTL_MS = 30 * 60_000;

/** 만드는 중 잠금 — 넘으면 끝난 걸로 본다 (서버가 중간에 죽었을 때) */
export const STICKER_BUSY_MS = 3 * 60_000;

/** 미리보기 한 장 크기(px) */
export const STICKER_PREVIEW_SIZE = 240;

/**
 * 스티커 그림 판. 그림을 크게 바꾸면 올린다 — 지금은 기록만 한다
 * (나중에 "새 그림으로 무료 갱신" 같은 걸 할 때 쓴다).
 */
export const STICKER_ART_VERSION = 1;
