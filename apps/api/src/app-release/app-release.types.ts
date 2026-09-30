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
  /** 스토어에 **실제로 공개된** 최신 버전. 심사 중일 때 올리면 유저가 없는 버전을 찾는다 */
  latestVersion: string;
  /** 이보다 낮으면 닫을 수 없는 업데이트 화면. 서버와 호환이 깨질 때만 올린다 */
  minSupportedVersion: string;
  storeUrl: string;
}
