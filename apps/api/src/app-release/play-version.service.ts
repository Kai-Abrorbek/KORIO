import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';

const ANDROID_PUBLISHER = 'https://androidpublisher.googleapis.com';
const SCOPE = 'https://www.googleapis.com/auth/androidpublisher';
/** 성공하면 1시간 뒤, 실패하면 10분 뒤 다시 묻는다 */
const REFRESH_MS = 60 * 60 * 1000;
const RETRY_MS = 10 * 60 * 1000;

export interface PlayLatest {
  /** 완전 공개(completed)된 릴리스 중 가장 큰 versionCode */
  versionCode: number;
  /** 릴리스 이름에서 읽은 "1.2.500". 이름에 버전이 없으면 null */
  versionName: string | null;
  checkedAt: string;
}

interface TrackRelease {
  name?: string;
  status?: string;
  versionCodes?: string[];
}

/**
 * 플레이 스토어에 **지금 공개된** 최신 버전을 읽어 둔다.
 *
 * 손으로 latestVersion 을 올리면, 심사 중에 먼저 올려서 유저가 "업데이트" 를
 * 눌러도 스토어에 새 버전이 없는 사고가 난다. 스토어가 공개했다고 말한 것만 믿는다.
 *
 *  - 트랙의 릴리스 중 status === 'completed' 만 센다. 단계적 출시(inProgress)는
 *    아직 못 받는 사람이 대부분이라 스토어로 보내면 헛걸음이다
 *  - 트랙을 읽으려면 edit 를 하나 열어야 한다 (Play API 구조). 읽기만 하고 바로 지운다
 *  - 서비스 계정 키는 결제 검증과 같은 GOOGLE_SERVICE_ACCOUNT_JSON.
 *    Play Console 에서 그 계정에 "앱 정보 보기" 권한이 있어야 한다
 *  - 설정이 없거나 실패하면 null → 컨트롤러가 app-releases.data.ts 의 값을 쓴다.
 *    요청 경로에서는 절대 구글을 부르지 않는다 (메모리 값만 읽는다)
 */
@Injectable()
export class PlayVersionService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PlayVersionService.name);
  private auth?: GoogleAuth;
  private latestValue: PlayLatest | null = null;
  private timer?: NodeJS.Timeout;
  private warnedMissing = false;

  latest(): PlayLatest | null {
    return this.latestValue;
  }

  onModuleInit() {
    void this.refresh();
  }

  onModuleDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  private schedule(ms: number) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.refresh(), ms);
    // 이 타이머 때문에 종료(SIGTERM 드레인)가 늦어지면 안 된다
    this.timer.unref?.();
  }

  private get packageName(): string | null {
    return process.env.GOOGLE_PLAY_PACKAGE_NAME?.trim() || null;
  }

  /** 기본은 production. 내부 테스트로 확인할 땐 internal 로 바꿔 쓴다 */
  private get track(): string {
    return process.env.GOOGLE_PLAY_RELEASE_TRACK?.trim() || 'production';
  }

  private getAuth(): GoogleAuth | null {
    if (this.auth) return this.auth;
    const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
    if (inline) {
      try {
        this.auth = new GoogleAuth({ credentials: JSON.parse(inline), scopes: [SCOPE] });
        return this.auth;
      } catch {
        return null;
      }
    }
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      this.auth = new GoogleAuth({ scopes: [SCOPE] });
      return this.auth;
    }
    return null;
  }

  private async call<T>(method: string, path: string): Promise<T> {
    const client = await this.getAuth()!.getClient();
    const headers = await client.getRequestHeaders();
    const res = await fetch(`${ANDROID_PUBLISHER}${path}`, {
      method,
      headers: Object.fromEntries(new Headers(headers)),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Play API ${res.status} ${method} ${path.replace(/edits\/[^/]+/, 'edits/…')} — ${text.slice(0, 200)}`);
    }
    const body = await res.text();
    return (body ? JSON.parse(body) : {}) as T;
  }

  async refresh(): Promise<void> {
    const pkg = this.packageName;
    if (!pkg || !this.getAuth()) {
      if (!this.warnedMissing) {
        this.logger.log('Play 설정이 없다 → 스토어 최신 버전은 app-releases.data.ts 값을 쓴다');
        this.warnedMissing = true;
      }
      return;
    }

    const base = `/androidpublisher/v3/applications/${encodeURIComponent(pkg)}/edits`;
    let editId: string | null = null;
    try {
      const edit = await this.call<{ id: string }>('POST', base);
      editId = edit.id;
      const track = await this.call<{ releases?: TrackRelease[] }>(
        'GET',
        `${base}/${encodeURIComponent(editId)}/tracks/${encodeURIComponent(this.track)}`,
      );

      let best: PlayLatest | null = null;
      for (const release of track.releases ?? []) {
        if (release.status !== 'completed') continue;
        for (const raw of release.versionCodes ?? []) {
          const code = Number(raw);
          if (!Number.isFinite(code) || (best && code <= best.versionCode)) continue;
          // 릴리스 이름은 보통 "1.2.500" 또는 "12 (1.2.500)" — 점 있는 숫자 묶음을 찾는다
          const name = /\d+\.\d+(?:\.\d+)*/.exec(release.name ?? '')?.[0] ?? null;
          best = { versionCode: code, versionName: name, checkedAt: new Date().toISOString() };
        }
      }

      if (best) {
        if (best.versionCode !== this.latestValue?.versionCode) {
          this.logger.log(`Play ${this.track} 최신: ${best.versionName ?? '?'} (${best.versionCode})`);
        }
        this.latestValue = best;
      }
      this.schedule(REFRESH_MS);
    } catch (error) {
      // 실패해도 마지막으로 알던 값은 그대로 둔다
      this.logger.warn(`스토어 버전 확인 실패 (${this.track}): ${(error as Error).message}`);
      this.schedule(RETRY_MS);
    } finally {
      if (editId) {
        await this.call('DELETE', `${base}/${encodeURIComponent(editId)}`).catch(() => undefined);
      }
    }
  }
}
