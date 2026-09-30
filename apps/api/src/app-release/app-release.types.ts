export type ReleaseLang = 'ko' | 'uz' | 'en' | 'ru';
export type ReleaseTag = 'new' | 'improve' | 'fix';
export type ReleasePlatform = 'mobile' | 'telegram';

export interface ReleaseItem {
  tag: ReleaseTag;
  text: Record<ReleaseLang, string>;
  /** 한쪽에만 들어간 변경이면 적는다. 없으면 둘 다 보여준다 */
  only?: ReleasePlatform;
}

export interface AppRelease {
  /** 고유 키. 날짜로 충분하다 (하루에 두 번 내면 -2 를 붙인다) */
  id: string;
  /** YYYY-MM-DD */
  date: string;
  /** 스토어에 새 버전이 올라간 업데이트만. OTA(JS)만 나간 날은 비운다 */
  storeVersion?: string;
  items: ReleaseItem[];
}

export interface StoreChannel {
  /** 예비값. 평소엔 플레이 API 가 읽은 값을 쓰고, 그걸 못 읽을 때만 이걸 쓴다 */
  latestVersion: string;
  /** 이보다 낮으면 닫을 수 없는 업데이트 화면. 서버와 호환이 깨질 때만 올린다 */
  minSupportedVersion: string;
  storeUrl: string;
}
