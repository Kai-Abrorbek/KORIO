import assert from "node:assert/strict";
import test from "node:test";
import {
  decodeGrokPromoMetadata,
  grokPromoLearnerIdentity,
  grokPromoSignature,
  type GrokPromoMetadata,
} from "./grok-promo-metadata.js";

const now = 1_800_000_000;
const secret = "unit-test-livekit-secret";
function dispatch(
  overrides: Partial<GrokPromoMetadata> = {},
): GrokPromoMetadata {
  const metadata = {
    version: 1 as const,
    kind: "admin-promo-grok" as const,
    sessionId: "bb9bdd47-5ef1-42b4-9fba-e8af8f2ef9ad",
    ownerId: "admin-user-id",
    instructions: "Improvise one short Korean tutoring question, then listen.",
    voice: "eve" as const,
    maxDurationSec: 600,
    expiresAt: now + 660,
    ...overrides,
  };
  return { ...metadata, signature: grokPromoSignature(metadata, secret) };
}

test("accepts the API's signed private dispatch and stable learner identity", () => {
  const metadata = dispatch();
  assert.deepEqual(
    decodeGrokPromoMetadata(JSON.stringify(metadata), secret, now),
    metadata,
  );
  assert.equal(
    grokPromoLearnerIdentity(metadata.sessionId),
    `grok-promo-owner-${metadata.sessionId}`,
  );
});

test("rejects altered owner, persona, duration, voice, or expiry", () => {
  const metadata = dispatch();
  for (const change of [
    { ownerId: "another-user" },
    { instructions: "Different unauthorized instructions" },
    { maxDurationSec: 599 },
    { voice: "rex" },
    { expiresAt: now + 700 },
  ]) {
    assert.throws(() =>
      decodeGrokPromoMetadata(
        JSON.stringify({ ...metadata, ...change }),
        secret,
        now,
      ),
    );
  }
  assert.throws(() =>
    decodeGrokPromoMetadata(JSON.stringify(metadata), "wrong-secret", now),
  );
});

test("rejects expired, excessive-duration, unrelated, or oversized dispatches", () => {
  for (const metadata of [
    dispatch({ expiresAt: now }),
    dispatch({ expiresAt: now + 1201 }),
    dispatch({ maxDurationSec: 601 }),
  ]) {
    assert.throws(() =>
      decodeGrokPromoMetadata(JSON.stringify(metadata), secret, now),
    );
  }
  assert.throws(() =>
    decodeGrokPromoMetadata(
      JSON.stringify({ ...dispatch(), kind: "voice-tutor" }),
      secret,
      now,
    ),
  );
  assert.throws(() => decodeGrokPromoMetadata("x".repeat(40_001), secret, now));
  assert.throws(() =>
    decodeGrokPromoMetadata(JSON.stringify(dispatch()), "", now),
  );
});
