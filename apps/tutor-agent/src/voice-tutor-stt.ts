/**
 * 받아쓰기(STT) 설정 — 배우는 언어(한국어·영어)와 수업 언어로 정한다.
 * voice-tutor-agent.ts 에서 옮겨 왔다: 워커를 띄우지 않고 테스트할 수 있게.
 */

/** 배우는 언어. 디스패치에 없으면 한국어 (옛 API) */
export type LearnedLanguage = "ko" | "en";

/**
 * 받아쓰기 언어 힌트.
 *
 * ⚠️ OpenAI 실시간 받아쓰기는 **우즈벡어(uz)를 힌트로 받지 않는다.** 예전엔
 *    ["ko", "uz"] 를 고정으로 넘겨서 첫 오디오에서 "Invalid value: 'uz'" 가 났고,
 *    STT 에러는 복구 불가라 AgentSession 이 통째로 닫혔다 — 인사말까지 중간에
 *    끊기고(AbortError) 그 뒤 학습자 말은 아무 데도 안 갔다.
 *
 * 러시아어·영어(·한국어) 학습자는 배우는 말 + 모국어 힌트. 우즈벡어 학습자는 힌트 없이
 * 자동 감지 — 배우는 말만 주면 우즈벡어로 한 말이 그 글자로 소리표기돼 GPT 가 못 알아듣는다.
 */
const STT_HINT_LANGUAGES = new Set(["en", "ru", "ko"]);

export function sttLanguageOptions(
  explanationLanguage: string | undefined,
  learned: LearnedLanguage = "ko",
): { language: string[]; detectLanguage: boolean } {
  // 몰입 수업(배우는 말로만 가르침): 그 말만 기대한다 — 힌트를 좁힐수록 인식이 정확하다
  if (explanationLanguage === learned) return { language: [learned], detectLanguage: false };
  if (explanationLanguage && STT_HINT_LANGUAGES.has(explanationLanguage)) {
    return { language: [learned, explanationLanguage], detectLanguage: false };
  }
  return { language: [learned], detectLanguage: true };
}

const STT_LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  ru: "Russian (Cyrillic)",
  uz: "Uzbek (Latin script)",
  ko: "Korean (Hangul)",
};

/**
 * 받아쓰기 문맥. "학습자 발음을 제멋대로 다른 단어로 듣는다" 대책.
 *
 * - 무슨 말 수업이고 어떤 언어가 섞이는지 알려 준다
 * - 억양이 센 학습자도 있으니 **하려던 단어**로 적되, 확실히 다른 말·지어낸
 *   말·다른 언어는 들은 그대로 둔다 (드립 소재는 살리고, 발음 탓 오인식은 줄인다)
 * - 선생님이 방금 한 말을 붙인다 — 학습자는 거기에 대답하는 중이라 이게 가장
 *   강한 힌트다 ("배고파라고 말해 봐" 뒤의 "배코파" → "배고파")
 */
export function sttPrompt(
  explanationLanguage: string | undefined,
  teacherJustSaid?: string,
  learned: LearnedLanguage = "ko",
): string {
  const other =
    explanationLanguage && explanationLanguage !== learned
      ? STT_LANGUAGE_NAMES[explanationLanguage]
      : undefined;
  const base =
    learned === "en"
      ? other
        ? `An English language lesson. The learner speaks English mixed with ${other}, often with a foreign accent. Write English in normal spelling and ${other} as spoken. For accented English, write the English word the learner is trying to say; keep clearly different words, made-up words and other languages exactly as said.`
        : "An English language lesson. The learner speaks English, often with a foreign accent. Write the English word the learner is trying to say in normal spelling; keep clearly different words, made-up words and other languages exactly as said."
      : other
        ? `A Korean language lesson. The learner speaks Korean mixed with ${other}, often with a foreign accent. Write Korean in Hangul and ${other} as spoken. For accented Korean, write the Korean word the learner is trying to say; keep clearly different words, made-up words and other languages exactly as said.`
        : "A Korean language lesson. The learner speaks Korean, often with a foreign accent. Write the Korean word the learner is trying to say in Hangul; keep clearly different words, made-up words and other languages exactly as said.";
  const context = teacherJustSaid
    ?.replace(/[\s"]+/g, " ")
    .trim()
    .slice(-220);
  return context
    ? `${base} The teacher just said: "${context}" — the learner is answering that.`
    : base;
}

/** App buttons → a learner turn the lesson agent recognises as a button press. */
export function buttonRequest(
  payload: string,
  learned: LearnedLanguage = "ko",
): string | undefined {
  const subject = learned === "en" ? "English" : "Korean";
  switch (payload.trim()) {
    case "slower":
      return "[[button: slower]] Say your last line again, slowly and clearly, with the same words. Then wait for me.";
    case "explain":
      return `[[button: explain]] I didn't get that. Explain what you just said (especially the ${subject} part) briefly in my teaching language, then give me the ${subject} again.`;
    default:
      return undefined;
  }
}
