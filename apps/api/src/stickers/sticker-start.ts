import type { TgUser } from '../payments/providers/telegram-stars/telegram.types';

/**
 * 봇 웹훅 → 스티커팩 연결 고리. 결제 모듈(봇 웹훅)이 StickersService 를 직접 import 하면
 * 스키마·장부까지 딸려 와서, 토큰과 인터페이스만 여기 둔다.
 */
export const STICKER_START_HANDLER = Symbol('STICKER_START_HANDLER');

/** 봇 /start 로 넘기는 표의 머리 (t.me/<bot>?start=stk_<token>) */
export const STICKER_START_PREFIX = 'stk_';

export interface StickerStartHandler {
  /** 기다리지 않고 부른다 — 안에서 전부 삼킨다 */
  handleStart(from: TgUser, token: string, chatId: number): Promise<void>;
}
