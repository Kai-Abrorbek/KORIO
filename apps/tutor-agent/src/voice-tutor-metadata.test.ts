import assert from "node:assert/strict";
import { test } from "node:test";
import { decodeVoiceTutorDispatchMetadata } from "./voice-tutor-metadata.js";

const valid = {
  version: 1,
  kind: "voice-tutor",
  sessionId: "507f1f77bcf86cd799439011",
  agentToken: "a".repeat(40),
  voiceId: "voice_12345",
  greeting: { displayText: "안녕하세요", speechText: "[happily] 안녕하세요" },
  maxDurationSec: 900,
};

test("Voice Tutor dispatch accepts its isolated versioned contract", () => {
  assert.deepEqual(
    decodeVoiceTutorDispatchMetadata(JSON.stringify(valid)),
    valid,
  );
});

test("Voice Tutor dispatch rejects missing token without leaking it", () => {
  const token = "sensitive-agent-token-should-not-appear-in-errors";
  assert.throws(
    () =>
      decodeVoiceTutorDispatchMetadata(
        JSON.stringify({ ...valid, agentToken: token, kind: "tutor" }),
      ),
    (error: unknown) =>
      error instanceof Error && !error.message.includes(token),
  );
});

test("Voice Tutor dispatch rejects unknown fields and invalid voice IDs", () => {
  assert.throws(() =>
    decodeVoiceTutorDispatchMetadata(
      JSON.stringify({ ...valid, unexpected: true }),
    ),
  );
  assert.throws(() =>
    decodeVoiceTutorDispatchMetadata(
      JSON.stringify({ ...valid, voiceId: "../other" }),
    ),
  );
});
