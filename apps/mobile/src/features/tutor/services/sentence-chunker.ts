/**
 * Realtime 이 흘려보내는 텍스트를 "지금 읽어도 되는 덩어리"로 자른다.
 *
 * 왜 필요한가: 답변이 다 끝난 뒤에 TTS 를 부르면 유저는 침묵을 몇 초 듣는다.
 * 반대로 토큰이 올 때마다 부르면 "오늘" "은" "뭐" 가 따로 읽혀서 말이 끊긴다.
 * 그 사이 어딘가 — 자연스러운 문장 경계 — 에서 잘라야 한다.
 *
 * 순수 함수다. 네트워크도 오디오도 없이 검사할 수 있게.
 */

/** 이보다 짧으면 아직 문장으로 보지 않는다 ("네." 같은 건 예외로 통과시킨다) */
const MIN_CHUNK = 2;
/**
 * 경계가 안 나와도 이만큼 쌓이면 안전한 자리에서 끊는다.
 * 모델이 마침표 없이 길게 이어가는 경우가 있는데, 그걸 다 기다리면
 * 문장 단위로 자른 의미가 없어진다.
 */
const MAX_CHUNK = 90;

/** 문장이 끝났다고 볼 문자 */
const ENDERS = /[.!?…。！？]/;
/** 경계가 없을 때 차선으로 끊을 자리 */
const SOFT = /[,，、;:·\s]/;

export interface ChunkResult {
  /** 지금 TTS 로 넘겨도 되는 문장들 */
  chunks: string[];
  /** 아직 덜 온 꼬리. 다음 델타와 이어 붙인다 */
  rest: string;
}

/**
 * @param flush 응답이 끝났을 때 true. 남은 꼬리를 짧더라도 내보낸다
 */
export function takeChunks(buffer: string, flush = false): ChunkResult {
  const chunks: string[] = [];
  let rest = buffer;

  // 경계가 나오는 만큼 계속 잘라낸다. 한 번의 델타에 문장 두 개가 올 수 있다
  for (;;) {
    const cut = findCut(rest);
    if (cut < 0) break;
    const piece = rest.slice(0, cut + 1).trim();
    rest = rest.slice(cut + 1);
    if (piece) chunks.push(piece);
  }

  if (flush) {
    const tail = rest.trim();
    if (tail) chunks.push(tail);
    rest = "";
  }

  return { chunks, rest };
}

/** 자를 위치(포함). 없으면 -1 */
function findCut(s: string): number {
  for (let i = 0; i < s.length; i++) {
    if (!ENDERS.test(s[i])) continue;
    // 소수점·줄임표 한가운데를 자르지 않는다: "3.5", "..." 은 문장 끝이 아니다
    if (s[i] === "." && /\d/.test(s[i - 1] ?? "") && /\d/.test(s[i + 1] ?? "")) {
      continue;
    }
    // 뒤따르는 문장부호("?!", "요.\"")까지 한 덩어리로 가져간다
    let end = i;
    while (end + 1 < s.length && /[.!?…"'」』)\]]/.test(s[end + 1])) end++;
    // 뒤에 아무것도 안 왔으면 아직 문장부호가 더 올 수 있다.
    // 확정하지 말고 다음 델타를 기다린다 (flush 가 결국 내보낸다)
    if (end + 1 >= s.length) return -1;
    if (s.slice(0, end + 1).trim().length >= MIN_CHUNK) return end;
  }

  // 경계가 없는데 너무 길어졌다 — 쉼표나 띄어쓰기에서 끊는다
  if (s.length >= MAX_CHUNK) {
    for (let i = MAX_CHUNK - 1; i > MAX_CHUNK / 2; i--) {
      if (SOFT.test(s[i])) return i;
    }
    // 끊을 자리조차 없으면 그냥 상한에서 자른다. 안 자르면 계속 쌓인다
    return MAX_CHUNK - 1;
  }
  return -1;
}
