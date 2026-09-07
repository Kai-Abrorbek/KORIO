/**
 * 이메일을 저장·조회에 쓸 한 가지 형태로 맞춘다.
 *
 * 안 맞추면 'Kai@x.com' 과 'kai@x.com' 이 서로 다른 계정이 된다. 폰 자판이
 * 첫 글자를 대문자로 올려서 실제로 자주 생기는 일이고, 당한 유저 입장에서는
 * "분명 가입했는데 로그인이 안 된다" 로만 보인다.
 *
 * RFC 상 로컬 파트(@ 앞)는 대소문자를 구분해도 되지만, 실제로 구분하는 메일
 * 서비스는 사실상 없다. 전체를 소문자로 내린다.
 *
 * ⚠️ 읽을 때도 쓸 때도 **양쪽 다** 통과시켜야 한다. 한쪽만 하면 저장은
 *    소문자인데 조회는 원문이라 아무도 못 찾는 상태가 된다.
 */
export function normalizeEmail(raw?: unknown): string {
  // @Transform 은 검증보다 **먼저** 돈다. { "email": 123 } 같은 게 그대로
  // 들어오므로 문자열이라고 가정하면 여기서 500 이 난다
  if (raw === undefined || raw === null) return '';
  return String(raw).trim().toLowerCase();
}

/**
 * 선택 항목(소셜 로그인의 email 처럼)용.
 *
 * 값이 없으면 빈 문자열이 아니라 undefined 를 돌려준다. '' 를 만들어 넣으면
 * 필드가 "있는" 상태가 돼서, sparse 유니크 인덱스에 '' 가 쌓이고 두 번째
 * 유저부터 가입이 막힌다 (referralCode 에서 이미 한 번 당한 함정이다).
 */
export function normalizeEmailOptional(raw?: unknown): string | undefined {
  return normalizeEmail(raw) || undefined;
}

/**
 * 이미 들어가 있는 문서들을 소문자로 옮길 때의 계획을 세운다.
 *
 * 그냥 전부 소문자로 밀면, 'Kai@x.com' 과 'kai@x.com' 이 둘 다 있는 경우
 * 유니크 인덱스에 걸려 터지거나 (더 나쁘게는) 한쪽 계정이 가려진다.
 * 그래서 겹치는 건 손대지 않고 따로 뽑아 사람이 판단하게 남긴다.
 *
 * DB 없이 검사할 수 있게 순수 함수로 뺐다.
 */
export interface EmailRow {
  id: string;
  email: string;
  provider?: string;
  createdAt?: Date | string;
}

export interface NormalizationPlan {
  /** 소문자로 바꿔도 안전한 것들 */
  updates: { id: string; from: string; to: string }[];
  /** 소문자로 내리면 서로 부딪히는 무리들. 사람이 정해야 한다 */
  collisions: { email: string; rows: EmailRow[] }[];
  /** 이미 소문자라 손댈 게 없는 개수 */
  untouched: number;
}

export function planEmailNormalization(rows: EmailRow[]): NormalizationPlan {
  const groups = new Map<string, EmailRow[]>();
  for (const r of rows) {
    if (!r.email) continue;
    const key = normalizeEmail(r.email);
    if (!key) continue;
    const list = groups.get(key);
    if (list) list.push(r);
    else groups.set(key, [r]);
  }

  const updates: NormalizationPlan['updates'] = [];
  const collisions: NormalizationPlan['collisions'] = [];
  let untouched = 0;

  for (const [key, list] of groups) {
    if (list.length > 1) {
      collisions.push({ email: key, rows: list });
      continue;
    }
    const only = list[0];
    if (only.email === key) untouched++;
    else updates.push({ id: only.id, from: only.email, to: key });
  }

  return { updates, collisions, untouched };
}
