import { z } from "zod";

// Keep this contract in sync with apps/api/src/voice-tutor/livekit dispatch metadata.
const dispatchMetadataSchema = z
  .object({
    version: z.literal(1),
    kind: z.literal("voice-tutor"),
    sessionId: z.string().regex(/^[a-f\d]{24}$/i),
    agentToken: z.string().min(32),
    voiceId: z.string().regex(/^[\w-]{8,100}$/),
    greeting: z
      .object({
        displayText: z.string().min(1),
        speechText: z.string().min(1),
      })
      .strict(),
    maxDurationSec: z.number().int().min(1).max(3600),
    // 없으면 옛 API 가 보낸 dispatch — 워커는 한국어+자동 감지로 받는다
    // 수업 언어. ko = 한국어로만 가르치는 몰입 수업
    explanationLanguage: z.enum(["ko", "en", "ru", "uz"]).optional(),
    // 이번 수업 목표 단어 — 받아쓰기 keywords 로 넘긴다
    sttKeywords: z.array(z.string().min(1).max(40)).max(30).optional(),
  })
  .strict();

export type VoiceTutorDispatchMetadata = z.infer<typeof dispatchMetadataSchema>;

export function decodeVoiceTutorDispatchMetadata(
  raw: string,
): VoiceTutorDispatchMetadata {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Invalid Voice Tutor dispatch metadata JSON");
  }
  const result = dispatchMetadataSchema.safeParse(parsed);
  if (!result.success) {
    // Never log the raw metadata: it contains the short-lived agent credential.
    throw new Error(
      `Invalid Voice Tutor dispatch metadata: ${result.error.issues.map((issue) => issue.path.join(".")).join(", ")}`,
    );
  }
  return result.data;
}
