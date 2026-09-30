import { Controller, Get, Query } from '@nestjs/common';
import { APP_RELEASES, STORE } from './app-releases.data';
import type { ReleaseLang, ReleasePlatform } from './app-release.types';

const LANGS: ReleaseLang[] = ['ko', 'uz', 'en', 'ru'];
const pickLang = (value?: string): ReleaseLang =>
  LANGS.includes(value as ReleaseLang) ? (value as ReleaseLang) : 'uz';

/** "1.2.10" 을 숫자로 비교한다. 문자열로 비교하면 1.2.10 < 1.2.9 가 된다 */
export function compareVersion(a: string, b: string): number {
  const pa = a.split('.').map((n) => parseInt(n, 10) || 0);
  const pb = b.split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

/**
 * 업데이트 히스토리 · 스토어 버전 확인. 로그인 전에도 부른다 (인증 없음).
 * 데이터는 app-releases.data.ts — 서버만 배포하면 앱 업데이트 없이 바뀐다.
 */
@Controller('app')
export class AppReleaseController {
  /** 업데이트 히스토리 (최신이 위). 문구는 요청한 언어 하나만 내려준다 */
  @Get('releases')
  releases(@Query('lang') lang?: string, @Query('platform') platform?: string) {
    const l = pickLang(lang);
    const p = platform as ReleasePlatform | undefined;
    return {
      releases: APP_RELEASES.map((release) => ({
        id: release.id,
        date: release.date,
        storeVersion: release.storeVersion ?? null,
        items: release.items
          .filter((item) => !item.only || !p || item.only === p)
          .map((item) => ({ tag: item.tag, text: item.text[l] })),
      })).filter((release) => release.items.length > 0),
    };
  }

  /**
   * 설치된 버전이 스토어 최신보다 낮은지.
   *  updateAvailable — "새 버전이 나왔어요" (닫을 수 있음)
   *  forceUpdate     — 최소 지원 버전보다 낮다 (닫을 수 없음)
   * version 이 없거나 이상하면 둘 다 false — 모르는데 막으면 안 된다.
   */
  @Get('version')
  version(@Query('version') version?: string) {
    const store = STORE.android;
    const valid = typeof version === 'string' && /^\d+(\.\d+)*$/.test(version);
    return {
      latestVersion: store.latestVersion,
      minSupportedVersion: store.minSupportedVersion,
      storeUrl: store.storeUrl,
      updateAvailable: valid && compareVersion(version, store.latestVersion) < 0,
      forceUpdate:
        valid && compareVersion(version, store.minSupportedVersion) < 0,
    };
  }
}
