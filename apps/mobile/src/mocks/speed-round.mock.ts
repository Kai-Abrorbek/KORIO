export interface SpeedSyllable {
  char: string;
  roman: string;
}

export const SPEED_POOL: SpeedSyllable[] = [
  // ㅏ 음절
  { char: "가", roman: "ga" },
  { char: "나", roman: "na" },
  { char: "다", roman: "da" },
  { char: "라", roman: "ra" },
  { char: "마", roman: "ma" },
  { char: "바", roman: "ba" },
  { char: "사", roman: "sa" },
  { char: "아", roman: "a" },
  { char: "자", roman: "ja" },
  { char: "차", roman: "cha" },
  { char: "카", roman: "ka" },
  { char: "타", roman: "ta" },
  { char: "파", roman: "pa" },
  { char: "하", roman: "ha" },
  // ㅓ
  { char: "거", roman: "geo" },
  { char: "너", roman: "neo" },
  { char: "더", roman: "deo" },
  { char: "머", roman: "meo" },
  { char: "서", roman: "seo" },
  { char: "어", roman: "eo" },
  { char: "저", roman: "jeo" },
  // ㅗ
  { char: "고", roman: "go" },
  { char: "노", roman: "no" },
  { char: "도", roman: "do" },
  { char: "모", roman: "mo" },
  { char: "보", roman: "bo" },
  { char: "소", roman: "so" },
  { char: "오", roman: "o" },
  { char: "조", roman: "jo" },
  // ㅜ
  { char: "구", roman: "gu" },
  { char: "누", roman: "nu" },
  { char: "두", roman: "du" },
  { char: "무", roman: "mu" },
  { char: "부", roman: "bu" },
  { char: "수", roman: "su" },
  { char: "우", roman: "u" },
  { char: "주", roman: "ju" },
  // ㅣ
  { char: "기", roman: "gi" },
  { char: "니", roman: "ni" },
  { char: "디", roman: "di" },
  { char: "미", roman: "mi" },
  { char: "비", roman: "bi" },
  { char: "시", roman: "si" },
  { char: "이", roman: "i" },
  { char: "지", roman: "ji" },
  // ㅡ
  { char: "그", roman: "geu" },
  { char: "느", roman: "neu" },
  { char: "므", roman: "meu" },
  { char: "스", roman: "seu" },
  { char: "으", roman: "eu" },
  // 받침 있는 단순 1음절 단어
  { char: "산", roman: "san" },
  { char: "물", roman: "mul" },
  { char: "꽃", roman: "kkot" },
  { char: "달", roman: "dal" },
  { char: "별", roman: "byeol" },
  { char: "밥", roman: "bap" },
  { char: "집", roman: "jip" },
  { char: "책", roman: "chaek" },
  { char: "학", roman: "hak" },
  { char: "강", roman: "gang" },
  { char: "공", roman: "gong" },
  { char: "봄", roman: "bom" },
  { char: "곰", roman: "gom" },
  { char: "눈", roman: "nun" },
  { char: "입", roman: "ip" },
  { char: "손", roman: "son" },
  { char: "발", roman: "bal" },
  { char: "길", roman: "gil" },
  { char: "옷", roman: "ot" },
  { char: "방", roman: "bang" },
];

export interface SpeedQuestion {
  syllable: string;
  options: string[];
  correctIndex: number;
}

/** 새 문제 생성: 정답 + 3개 distractor (랜덤) */
export function generateQuestion(prevSyllable?: string): SpeedQuestion {
  // 정답 선택 (직전 문제와 같지 않도록)
  let correct: SpeedSyllable;
  do {
    correct = SPEED_POOL[Math.floor(Math.random() * SPEED_POOL.length)];
  } while (correct.char === prevSyllable);

  // 3개 distractor (정답과 다른 romanization)
  const seen = new Set([correct.roman]);
  const distractors: string[] = [];
  let safety = 0;
  while (distractors.length < 3 && safety < 100) {
    safety++;
    const cand = SPEED_POOL[Math.floor(Math.random() * SPEED_POOL.length)];
    if (!seen.has(cand.roman)) {
      seen.add(cand.roman);
      distractors.push(cand.roman);
    }
  }

  // 4개 옵션 셔플
  const all = [correct.roman, ...distractors];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  return {
    syllable: correct.char,
    options: all,
    correctIndex: all.indexOf(correct.roman),
  };
}

/** 콤보 → 배수 */
export function comboMultiplier(combo: number): number {
  if (combo >= 10) return 5;
  if (combo >= 6) return 3;
  if (combo >= 3) return 2;
  return 1;
}
