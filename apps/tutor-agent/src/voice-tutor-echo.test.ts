import assert from "node:assert/strict";
import test from "node:test";
import { ECHO_TAIL_MS, TutorEchoGuard, soundsLikeTutor } from "./voice-tutor-echo.js";

const tutor =
  "[gasps] OISHII?! Bu yaponcha, voy tentak! Koreyscha “mazali” — 맛있어요! Qani, ayt: 맛있어요!";

test("recognises the tutor's own line coming back through the mic", () => {
  // STT drops tags and punctuation and garbles a little — still the same line.
  assert.equal(
    soundsLikeTutor("Oishii bu yaponcha voy tentak koreyscha mazali 맛있어요", [tutor]),
    true,
  );
});

test("lets a learner repeat the phrase they were asked to say", () => {
  assert.equal(soundsLikeTutor("맛있어요", [tutor]), false);
  assert.equal(
    soundsLikeTutor("저는 어제 학교에 갔어요", [
      "Kecha maktabga hozirgi zamonda boribsanmi? To‘g‘risi: 저는 어제 학교에 갔어요 — ayt-chi.",
    ]),
    false,
  );
  assert.equal(soundsLikeTutor("Men talabaman, ramen yoqtiraman", [tutor]), false);
});

test("drops only what overlaps the tutor's turn in time", () => {
  let clock = 0;
  const guard = new TutorEchoGuard(() => clock);
  guard.tutorSaid(tutor);
  guard.agentState("speaking");
  clock = 3_000;
  guard.agentState("listening");

  // Leaked tail: "speech" starts as the tutor stops.
  clock = 3_200;
  guard.learnerState("speaking");
  assert.equal(guard.isEcho("Bu yaponcha voy tentak koreyscha mazali 맛있어요"), true);

  // A real reply starts later — even if it quotes the tutor.
  clock = 3_000 + ECHO_TAIL_MS + 1_500;
  guard.learnerState("speaking");
  assert.equal(guard.isEcho("Bu yaponcha voy tentak koreyscha mazali 맛있어요"), false);
});
