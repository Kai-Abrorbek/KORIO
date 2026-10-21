import assert from "node:assert/strict";
import { test } from "node:test";
import { decodeVoiceTutorDispatchMetadata } from "./voice-tutor-metadata.js";
import { buttonRequest, sttLanguageOptions, sttPrompt } from "./voice-tutor-stt.js";

test("the Korean tutor keeps its recognizer hints", () => {
  assert.deepEqual(sttLanguageOptions("ko"), { language: ["ko"], detectLanguage: false });
  assert.deepEqual(sttLanguageOptions("ru"), { language: ["ko", "ru"], detectLanguage: false });
  assert.deepEqual(sttLanguageOptions("en"), { language: ["ko", "en"], detectLanguage: false });
  assert.deepEqual(sttLanguageOptions("uz"), { language: ["ko"], detectLanguage: true });
  assert.match(sttPrompt("uz"), /^A Korean language lesson\. .*Uzbek/);
});

test("the English tutor listens for English plus the teaching language", () => {
  assert.deepEqual(sttLanguageOptions("en", "en"), { language: ["en"], detectLanguage: false });
  assert.deepEqual(sttLanguageOptions("ru", "en"), { language: ["en", "ru"], detectLanguage: false });
  assert.deepEqual(sttLanguageOptions("ko", "en"), { language: ["en", "ko"], detectLanguage: false });
  // Uzbek is never a hint (the realtime recognizer rejects it): auto-detect instead.
  assert.deepEqual(sttLanguageOptions("uz", "en"), { language: ["en"], detectLanguage: true });
  const prompt = sttPrompt("ko", "Say 'Can I get a receipt?'", "en");
  assert.match(prompt, /^An English language lesson\. .*Korean \(Hangul\)/);
  assert.match(prompt, /The teacher just said: "Say 'Can I get a receipt\?'"/);
  assert.doesNotMatch(sttPrompt("en", undefined, "en"), /Hangul/);
});

test("app buttons ask about the language being learned", () => {
  assert.match(buttonRequest("explain", "en") ?? "", /the English part.*the English again/);
  assert.match(buttonRequest("explain") ?? "", /the Korean part.*the Korean again/);
  assert.equal(buttonRequest("dance", "en"), undefined);
});

test("dispatch carries the English tutor and still accepts Korean without it", () => {
  const base = {
    version: 1,
    kind: "voice-tutor",
    sessionId: "507f1f77bcf86cd799439011",
    agentToken: "a".repeat(40),
    voiceId: "voice_12345",
    greeting: { displayText: "Hi!", speechText: "Hi!" },
    maxDurationSec: 900,
  };
  assert.equal(
    decodeVoiceTutorDispatchMetadata(JSON.stringify({ ...base, targetLanguage: "en" })).targetLanguage,
    "en",
  );
  assert.equal(decodeVoiceTutorDispatchMetadata(JSON.stringify(base)).targetLanguage, undefined);
  assert.throws(() =>
    decodeVoiceTutorDispatchMetadata(JSON.stringify({ ...base, targetLanguage: "ja" })),
  );
});
