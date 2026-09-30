import { Controller, Get, Query } from '@nestjs/common';
import { APP_RELEASES, STORE } from './app-releases.data';
import { PlayVersionService } from './play-version.service';
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
  constructor(private readonly play: PlayVersionService) {}

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
   *
   * 스토어 최신은 플레이 API 가 "완전 공개" 라고 한 릴리스(PlayVersionService).
   * 앱이 build(versionCode)를 보내면 그걸로 비교한다 — 릴리스 이름이 어떻게
   * 적혀 있든 정확하다. 플레이 값을 못 읽었으면 app-releases.data.ts 의 값.
   * 최소 지원 버전은 사람이 정하는 정책이라 항상 파일 값.
   * version 이 없거나 이상하면 둘 다 false — 모르는데 막으면 안 된다.
   */
  @Get('version')
  version(@Query('version') version?: string, @Query('build') build?: string) {
    const store = STORE.android;
    const auto = this.play.latest();
    const valid = typeof version === 'string' && /^\d+(\.\d+)*$/.test(version);
    const buildNo = Number(build);
    const latestVersion = auto?.versionName ?? store.latestVersion;

    let updateAvailable = false;
    if (auto && Number.isInteger(buildNo) && buildNo > 0) {
      updateAvailable = buildNo < auto.versionCode;
    } else if (valid) {
      updateAvailable = compareVersion(version, latestVersion) < 0;
    }

    return {
      latestVersion,
      minSupportedVersion: store.minSupportedVersion,
      storeUrl: store.storeUrl,
      source: auto ? 'play' : 'file',
      updateAvailable,
      forceUpdate:
        valid && compareVersion(version, store.minSupportedVersion) < 0,
    };
  }
}
