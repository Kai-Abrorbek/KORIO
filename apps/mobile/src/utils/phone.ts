import * as Crypto from "expo-crypto";
import { guessIso, toE164 } from "./phone-format";

export { guessIso, toE164 };

/**
 * E.164 → SHA-256(hex).
 *
 * ⚠️ 서버의 hashPhone 과 **정확히 같아야** 한다 (같은 문자열, 같은 알고리즘).
 * 한쪽만 바꾸면 매칭이 조용히 0건이 된다.
 */
export async function hashPhone(e164: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, e164, {
    encoding: Crypto.CryptoEncoding.HEX,
  });
}

/** 연락처 번호 목록 → 해시 목록. 중복 제거하고 상한을 건다 */
export async function hashContacts(
  numbers: string[],
  defaultIso: string,
  limit = 2000,
): Promise<{ hashes: string[]; normalized: Map<string, string> }> {
  const seen = new Map<string, string>(); // e164 → 원본
  for (const raw of numbers) {
    const e164 = toE164(raw, defaultIso);
    if (e164 && !seen.has(e164)) seen.set(e164, raw);
    if (seen.size >= limit) break;
  }
  const hashes = await Promise.all([...seen.keys()].map(hashPhone));
  return { hashes, normalized: seen };
}
