import assert from "node:assert/strict";
import test from "node:test";
import {
  GrokPromoProtocol,
  grokPromoSessionUpdate,
  playedAudioMs,
  type GrokPromoState,
} from "./grok-promo-protocol.js";

function fixture() {
  const sent: Record<string, unknown>[] = [];
  const audio: { pcm: Buffer; generation: number }[] = [];
  const states: GrokPromoState[] = [];
  const transcripts: { role: string; text: string; id: string }[] = [];
  const finished: number[] = [];
  const continuations: boolean[] = [];
  const expressions: string[] = [];
  let cleared = 0;
  let errors = 0;
  const protocol = new GrokPromoProtocol({
    send: (event) => sent.push(event),
    audio: (pcm, generation) => audio.push({ pcm, generation }),
    state: (state) => states.push(state),
    transcript: (role, text, id) => transcripts.push({ role, text, id }),
    clearAudio: () => {
      cleared++;
    },
    playedMs: () => 10,
    finishAudio: (generation, continueAfterTools) => {
      finished.push(generation);
      continuations.push(continueAfterTools);
    },
    expression: (emotion) => expressions.push(emotion),
    error: () => {
      errors++;
    },
  });
  return {
    protocol,
    sent,
    audio,
    states,
    transcripts,
    finished,
    continuations,
    expressions,
    cleared: () => cleared,
    errors: () => errors,
  };
}
const pcm = Buffer.alloc(960).toString("base64");

test("barge-in counts played PCM duration in the same millisecond units as rtc-node's queue", () => {
  assert.equal(playedAudioMs(1_500, 200), 1_300);
  assert.equal(playedAudioMs(0, 200), 0);
  assert.equal(playedAudioMs(1_500, 0), 1_500);
  assert.equal(playedAudioMs(1_500, NaN), 0);
});

test("configures Grok native audio and starts one generated opening without seeded words", () => {
  const update = grokPromoSessionUpdate("An improvised personality", "eve");
  assert.equal(update.session.audio.input.format.type, "audio/pcm");
  assert.equal(update.session.audio.output.format.rate, 24_000);
  assert.equal(update.session.turn_detection.type, "server_vad");
  assert.equal("input_audio_transcription" in update.session, false);
  const f = fixture();
  f.protocol.receive({ type: "session.updated" });
  f.protocol.receive({ type: "session.updated" });
  assert.deepEqual(f.sent, [{ type: "response.create" }]);
});

test("barge-in clears audio, truncates unheard history, and drops late cancelled audio/text", () => {
  const f = fixture();
  f.protocol.receive({ type: "response.created", response: { id: "old" } });
  f.protocol.receive({
    type: "response.output_audio.delta",
    response_id: "old",
    item_id: "msg-old",
    delta: pcm,
  });
  const oldGeneration = f.audio[0].generation;
  f.protocol.receive({ type: "input_audio_buffer.speech_started" });
  assert.equal(f.cleared(), 1);
  assert.equal(f.protocol.isCurrent(oldGeneration), false);
  assert.deepEqual(f.sent, [
    {
      type: "conversation.item.truncate",
      item_id: "msg-old",
      content_index: 0,
      audio_end_ms: 10,
    },
  ]);
  f.protocol.receive({
    type: "response.output_audio.delta",
    response_id: "old",
    delta: pcm,
  });
  f.protocol.receive({
    type: "response.output_audio_transcript.done",
    response_id: "old",
    transcript: "unheard",
    item_id: "msg-old",
  });
  assert.equal(f.audio.length, 1);
  assert.equal(f.transcripts.length, 0);
  f.protocol.receive({ type: "response.created", response: { id: "new" } });
  f.protocol.receive({
    type: "response.audio.delta",
    response_id: "new",
    delta: pcm,
  });
  assert.equal(f.audio.length, 2);
  assert.equal(f.protocol.isCurrent(f.audio[1].generation), true);
});

test("manual stop cancels an active response and normal completion waits for the playout hook", () => {
  const f = fixture();
  f.protocol.receive({ type: "response.created", response: { id: "r1" } });
  f.protocol.interrupt();
  assert.deepEqual(f.sent, [{ type: "response.cancel" }]);
  f.protocol.receive({
    type: "error",
    error: { code: "response_cancel_not_active" },
  });
  assert.equal(f.errors(), 0);
  f.protocol.receive({ type: "response.created", response: { id: "r2" } });
  f.protocol.receive({
    type: "response.done",
    response: { id: "r2", status: "completed" },
  });
  assert.deepEqual(f.finished, [f.protocol.generation]);
  f.protocol.stop();
  assert.equal(f.protocol.isCurrent(f.finished[0]), false);
  const states = f.states.length;
  f.protocol.receive({ type: "response.created", response: { id: "r3" } });
  assert.equal(f.states.length, states);
});

test("expression tools stay silent and submit all results before one playout-gated continuation", () => {
  const f = fixture();
  f.protocol.receive({ type: "response.created", response: { id: "r1" } });
  f.protocol.receive({
    type: "response.function_call_arguments.done",
    response_id: "r1",
    call_id: "c1",
    name: "set_expression",
    arguments: '{"emotion":"shocked"}',
  });
  f.protocol.receive({
    type: "response.function_call_arguments.done",
    response_id: "r1",
    call_id: "c2",
    name: "set_expression",
    arguments: '{"emotion":"unknown"}',
  });
  assert.deepEqual(f.expressions, ["shocked"]);
  assert.equal(f.sent.length, 2);
  assert.equal(
    f.sent.some((event) => event.type === "response.create"),
    false,
  );
  assert.equal(f.audio.length, 0);
  assert.equal(f.transcripts.length, 0);
  f.protocol.receive({
    type: "response.done",
    response: { id: "r1", status: "completed" },
  });
  assert.deepEqual(f.continuations, [true]);
  f.protocol.receive({
    type: "response.done",
    response: { id: "r1", status: "completed" },
  });
  assert.deepEqual(f.continuations, [true]);
  f.protocol.interrupt();
  assert.equal(f.protocol.isCurrent(f.finished[0]), false);
});

test("forwards actual speaker transcripts and fails closed on malformed PCM/provider errors", () => {
  const f = fixture();
  f.protocol.receive({
    type: "conversation.item.input_audio_transcription.completed",
    transcript: "씨발",
    item_id: "u1",
  });
  f.protocol.receive({
    type: "response.output_audio_transcript.done",
    transcript: "An improvised reaction",
    item_id: "a1",
  });
  assert.deepEqual(f.transcripts, [
    { role: "user", text: "씨발", id: "u1" },
    { role: "tutor", text: "An improvised reaction", id: "a1" },
  ]);
  f.protocol.receive({ type: "response.created", response: { id: "r1" } });
  f.protocol.receive({ type: "response.output_audio.delta", delta: "AA==" });
  f.protocol.receive({ type: "error", error: { code: "insufficient_quota" } });
  assert.equal(f.errors(), 2);
  assert.equal(f.audio.length, 0);
});
