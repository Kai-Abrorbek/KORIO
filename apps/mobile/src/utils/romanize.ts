/**
 * 한글 → 로마자 (국어의 로마자 표기법).
 *
 * 학습자에게 **읽는 법**을 보여주는 용도다. 논문용 전사가 아니라, 우즈벡·러시아
 * 학습자가 소리를 짐작할 수 있으면 된다.
 *
 * ⚠️ **글자 그대로 옮기면 틀린다.** 한국어는 쓰는 것과 읽는 것이 다르다:
 *
 *     마셨어요  글자대로 ma-syeoss-eo-yo   ← 아무도 이렇게 안 읽는다
 *               실제      ma-syeo-sseo-yo
 *     같이      글자대로 gat-i             실제 ga-chi
 *     한국말    글자대로 han-guk-mal       실제 han-gung-mal
 *
 * 그래서 소리 규칙을 먼저 적용하고 옮긴다. 다섯 가지만 넣었다 — 학습자가
 * 실제로 만나는 것의 대부분이고, 나머지는 예외가 많아 규칙보다 사전이 낫다.
 */

const CHO = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
const JUNG = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
/** 받침 소리값. 이동은 아래 MOVE 가 따로 다룬다 */
const JONG = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'];

/** 자음 인덱스 (초성 기준) */
const C = { g:0, kk:1, n:2, d:3, tt:4, r:5, m:6, b:7, pp:8, s:9, ss:10, none:11, j:12, jj:13, ch:14, k:15, t:16, p:17, h:18 };

/**
 * 받침이 뒤 음절로 넘어갈 때(연음) 무엇이 남고 무엇이 가는가.
 *
 * 겹받침은 **앞은 남고 뒤만 간다** — 읽 + 어 = 일거(il-geo). 통째로 옮기면
 * "이르거" 같은 소리가 나온다.
 */
const J = { none:0, k:1, n:4, l:8, m:16, p:17, ng:21 };
const MOVE: Record<number, { keep: number; go: number }> = {
  1:{keep:J.none,go:C.g}, 2:{keep:J.none,go:C.kk}, 3:{keep:J.k,go:C.s},
  4:{keep:J.none,go:C.n}, 5:{keep:J.n,go:C.j}, 6:{keep:J.n,go:C.none},
  7:{keep:J.none,go:C.d}, 8:{keep:J.none,go:C.r}, 9:{keep:J.l,go:C.g},
  10:{keep:J.l,go:C.m}, 11:{keep:J.l,go:C.b}, 12:{keep:J.l,go:C.s},
  13:{keep:J.l,go:C.t}, 14:{keep:J.l,go:C.p}, 15:{keep:J.l,go:C.none},
  16:{keep:J.none,go:C.m}, 17:{keep:J.none,go:C.b}, 18:{keep:J.p,go:C.s},
  19:{keep:J.none,go:C.s}, 20:{keep:J.none,go:C.ss},
  21:{keep:J.ng,go:C.none},         // ㅇ 은 안 넘어간다 (앙아 → ang-a)
  22:{keep:J.none,go:C.j}, 23:{keep:J.none,go:C.ch}, 24:{keep:J.none,go:C.k},
  25:{keep:J.none,go:C.t}, 26:{keep:J.none,go:C.p}, 27:{keep:J.none,go:C.none}, // ㅎ 은 사라진다
};

/** 받침 갈래 — 비음화·격음화에 쓴다 */
const K_FINAL = new Set([1,2,3,9,24]);   // ㄱ 소리
const T_FINAL = new Set([7,19,20,22,23,25,27]); // ㄷ 소리
const P_FINAL = new Set([17,18,26,14]);  // ㅂ 소리

interface Syl { cho: number; jung: number; jong: number }

export function romanize(text: string): string {
  const out: string[] = [];
  let buf: Syl[] = [];

  const flush = () => {
    if (buf.length) out.push(sound(buf).join('-'));
    buf = [];
  };

  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const i = code - 0xac00;
      buf.push({ cho: Math.floor(i / 588), jung: Math.floor((i % 588) / 28), jong: i % 28 });
    } else {
      flush();
      out.push(ch);
    }
  }
  flush();
  return out.join('').replace(/-+/g, '-').replace(/(^-|-$)/gm, '').trim();
}

/** 소리 규칙을 적용하고 음절별 로마자를 낸다 */
function sound(sylls: Syl[]): string[] {
  const s = sylls.map((x) => ({ ...x }));

  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i]!, b = s[i + 1]!;
    if (!a.jong) continue;

    // ① 구개음화 — ㄷ/ㅌ + 이 → 지/치 (같이 ga-chi). 연음보다 먼저다
    if ((a.jong === 7 || a.jong === 25) && b.cho === C.none && b.jung === 20) {
      b.cho = a.jong === 7 ? C.j : C.ch;
      a.jong = 0;
      continue;
    }

    // ② 격음화 — ㅎ 을 만나면 거센소리가 된다 (입학 i-pak, 좋고 jo-ko)
    if (a.jong === 27 && [C.g, C.d, C.b, C.j].includes(b.cho)) {
      b.cho = { [C.g]: C.k, [C.d]: C.t, [C.b]: C.p, [C.j]: C.ch }[b.cho]!;
      a.jong = 0;
      continue;
    }
    if (b.cho === C.h) {
      if (K_FINAL.has(a.jong)) { a.jong = 0; b.cho = C.k; continue; }
      if (T_FINAL.has(a.jong)) { a.jong = 0; b.cho = C.t; continue; }
      if (P_FINAL.has(a.jong)) { a.jong = 0; b.cho = C.p; continue; }
    }

    // ③ 연음 — 뒤가 ㅇ 이면 받침이 넘어간다. 이게 제일 중요하다
    if (b.cho === C.none) {
      const m = MOVE[a.jong];
      if (m) { a.jong = m.keep; b.cho = m.go; }
      continue;
    }

    // ④ 비음화 — ㄱ/ㄷ/ㅂ 이 ㄴ/ㅁ 을 만나면 콧소리가 된다 (한국말 han-gung-mal)
    if (b.cho === C.n || b.cho === C.m) {
      if (K_FINAL.has(a.jong)) { a.jong = 21; continue; }   // → ㅇ
      if (T_FINAL.has(a.jong)) { a.jong = 4; continue; }    // → ㄴ
      if (P_FINAL.has(a.jong)) { a.jong = 16; continue; }   // → ㅁ
    }

    // ⑤ 유음화 — ㄴ 과 ㄹ 이 만나면 ㄹㄹ (신라 sil-la, 설날 seol-lal)
    if (a.jong === 4 && b.cho === C.r) { a.jong = 8; continue; }
    if (a.jong === 8 && b.cho === C.n) { b.cho = C.r; continue; }
  }

  // ㄹ 뒤의 ㄹ 은 r 이 아니라 l 이다 (신라 sil-la). 규칙 단계에서 받침만 바꿔
  // 놓으면 뒤 음절이 여전히 r 로 나와서 "sil-ra" 가 된다
  return s.map((x, i) => {
    const cho = i > 0 && s[i - 1]!.jong === J.l && x.cho === C.r ? 'l' : CHO[x.cho]!;
    return cho + JUNG[x.jung]! + JONG[x.jong]!;
  });
}
