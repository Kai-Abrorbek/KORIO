/**
 * 바깥 서비스(OpenAI 받아쓰기·ElevenLabs 목소리) 계정이 **막혔는지** 가린다.
 *
 * 크레딧 소진·키 무효는 다시 시도해도 안 풀린다. 그런데 LiveKit 의 구간 받아쓰기는
 * 실패를 로그로만 남기고 삼켜서, 예전엔 튜터가 인사만 하고 "듣고 있어요" 에 멈춰
 * 있었다 (2026-10-28 — OpenAI credit_balance_exhausted). 막힌 걸 알아채면 워커가
 * 안내 한 마디를 하고 통화를 끝낸다 (voice-tutor-agent).
 *
 * 잠깐의 429(속도 제한)·5xx·네트워크 오류는 막힘이 아니다 — 그건 원래대로 다시 시도한다.
 */

/** API 가 대답 생성(OpenAI)이 막혔을 때 done 에 실어 보내는 경고 (apps/api voice-tutor) */
export const PROVIDER_BLOCKED_WARNING = "VOICE_TUTOR_PROVIDER_BLOCKED";

/** 앱·텔레그램이 읽는 끝난 이유 — 에이전트 참가자 attribute */
export const ATTR_END_REASON = "korio.end_reason";
export const END_REASON_UNAVAILABLE = "unavailable";

/** 계정이 막혔다는 뜻의 오류 문구 (OpenAI · ElevenLabs) */
const BLOCKED_TEXT =
  /insufficient_quota|credit_balance|billing_hard_limit|exceeded your current quota|no credits remaining|invalid_api_key|incorrect api key|account_deactivated|quota_exceeded|detected_unusual_activity|payment_required/i;

function fieldText(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

/**
 * OpenAI SDK 오류(status · code · error.type), LiveKit APIStatusError(statusCode · body),
 * 그냥 Error(message) 를 다 본다. cause 를 세 단계까지 따라간다.
 */
export function isProviderBlocked(error: unknown, depth = 0): boolean {
  if (!error || typeof error !== "object" || depth > 3) return false;
  const e = error as Record<string, unknown>;
  const status = typeof e.status === "number" ? e.status : typeof e.statusCode === "number" ? e.statusCode : undefined;
  // 401 = 키가 틀렸거나 지워졌다, 402 = 결제 필요, 403 = 계정·조직 권한
  if (status === 401 || status === 402 || status === 403) return true;
  const text = [e.code, e.type, e.message, e.body, e.error].map(fieldText).join(" ");
  if (BLOCKED_TEXT.test(text)) return true;
  return isProviderBlocked(e.cause, depth + 1);
}

/** 막혔을 때 학습자에게 하는 한 마디 — 수업 설명 언어로 (API 의 unavailableFallback 과 같은 뜻) */
export const UNAVAILABLE_SPEECH: Record<string, string> = {
  ko: "죄송해요, 지금은 기술적인 문제로 수업을 이어 갈 수 없어요. 잠시 후에 다시 시작해 주세요.",
  en: "Sorry, I can't continue the lesson right now because of a technical problem. Please try again a little later.",
  ru: "Извините, сейчас я не могу продолжить урок из-за технической проблемы. Попробуйте, пожалуйста, чуть позже.",
  uz: "Kechirasiz, texnik muammo tufayli darsni hozir davom ettira olmayman. Birozdan keyin qayta boshlang.",
};

export function unavailableSpeech(language: string | undefined): string {
  return UNAVAILABLE_SPEECH[language ?? "ko"] ?? UNAVAILABLE_SPEECH.ko!;
}
