/**
 * 튜터 목소리 제공자.
 *
 * 업체 하나에 튜터 전체를 묶지 않기 위한 경계다. 지금은 Azure 가 기본이지만
 * 음질을 비교해서 한국어만 다른 업체로 옮길 수 있어야 하고, 그때 고쳐야 하는
 * 곳은 이 인터페이스의 구현체 하나뿐이어야 한다.
 *
 * ⚠️ 부르는 쪽에 업체 이름이 등장하면 안 된다. 선생님 프로필의
 *    tts.provider 문자열 → 레지스트리 → 어댑터 순서로만 닿는다.
 */
export type TutorTtsLanguage = 'ko' | 'uz';

export interface TutorTtsRequest {
  text: string;
  voiceId: string;
  /** 1.0 이 보통. 선생님마다 다르다 */
  speed?: number;
  language: TutorTtsLanguage;
}

export interface TutorTtsStream {
  /** 첫 바이트가 오는 즉시 흘려보낸다. 전부 모았다가 주지 않는다 */
  body: NodeJS.ReadableStream;
  contentType: string;
  /** 과금 집계용 (업체는 보통 글자 수로 센다) */
  characters: number;
}

export interface TutorTtsProvider {
  readonly name: string;
  /** 키가 없으면 false. 레지스트리가 이걸 보고 폴백을 고른다 */
  isConfigured(): boolean;
  synthesizeStream(req: TutorTtsRequest): Promise<TutorTtsStream>;
}

/** 업체가 죽었을 때 튜터 전체가 같이 죽지 않게, 이 에러만 위로 올린다 */
export class TutorTtsError extends Error {
  constructor(
    readonly provider: string,
    message: string,
  ) {
    super(message);
    this.name = 'TutorTtsError';
  }
}
