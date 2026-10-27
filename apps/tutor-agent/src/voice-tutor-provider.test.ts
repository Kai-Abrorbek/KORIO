import assert from "node:assert/strict";
import { test } from "node:test";
import { isProviderBlocked, unavailableSpeech } from "./voice-tutor-provider.js";

test("an exhausted OpenAI account is blocked", () => {
  // openai SDK RateLimitError 모양 (2026-10-28 실제 응답)
  const sdkError = Object.assign(new Error("429 You have no credits remaining."), {
    status: 429,
    code: "credit_balance_exhausted",
    type: "insufficient_quota",
  });
  assert.equal(isProviderBlocked(sdkError), true);
  assert.equal(isProviderBlocked({ statusCode: 429, body: { error: { type: "insufficient_quota" } } }), true);
  assert.equal(isProviderBlocked(new Error("You exceeded your current quota, please check your plan")), true);
});

test("a wrong or deleted key is blocked", () => {
  assert.equal(isProviderBlocked({ status: 401, message: "Incorrect API key provided" }), true);
  assert.equal(isProviderBlocked({ statusCode: 403 }), true);
  // ElevenLabs
  assert.equal(isProviderBlocked(new Error("quota_exceeded: This request exceeds your quota")), true);
});

test("the reason can sit inside a wrapper's cause", () => {
  const inner = Object.assign(new Error("429"), { status: 429, code: "insufficient_quota" });
  assert.equal(isProviderBlocked(new Error("failed to recognize speech", { cause: inner })), true);
});

test("passing trouble is not a block — it is retried as before", () => {
  assert.equal(isProviderBlocked({ status: 429, message: "Rate limit reached for requests" }), false);
  assert.equal(isProviderBlocked({ status: 500, message: "Internal server error" }), false);
  assert.equal(isProviderBlocked(new Error("fetch failed")), false);
  assert.equal(isProviderBlocked(undefined), false);
});

test("the goodbye follows the teaching language", () => {
  assert.match(unavailableSpeech("ko"), /수업을 이어 갈 수 없어요/);
  assert.match(unavailableSpeech("uz"), /qayta boshlang/);
  assert.equal(unavailableSpeech("xx"), unavailableSpeech("ko"));
});
