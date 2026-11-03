import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createRecallSaveAttempt,
  saveRecallProgress,
} from "./word-recall-progress.ts";
import { wordRecallPersistence } from "./word-study.i18n.ts";

function deferred() {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

function fixture(overrides = {}) {
  const calls = [];
  return {
    calls,
    input: {
      attempt: createRecallSaveAttempt(),
      wordId: "word-1",
      correct: true,
      hadHelp: false,
      review: async (id, result) => {
        calls.push(["review", id, result]);
      },
      master: async (id) => {
        calls.push(["master", id]);
      },
      isActive: () => true,
      ...overrides,
    },
  };
}

test("a correct answer becomes complete only after the server acknowledges mastery", async () => {
  const reviewed = deferred();
  const mastered = deferred();
  const calls = [];
  const { input } = fixture({
    review: async () => {
      calls.push("review");
      await reviewed.promise;
    },
    master: async () => {
      calls.push("master");
      await mastered.promise;
    },
  });
  let complete = false;
  const saving = saveRecallProgress(input).then((saved) => {
    complete = saved;
  });
  assert.deepEqual(calls, ["review"]);
  assert.equal(complete, false);
  reviewed.resolve();
  await Promise.resolve();
  await Promise.resolve();
  assert.deepEqual(calls, ["review", "master"]);
  assert.equal(complete, false);
  mastered.resolve();
  await saving;
  assert.equal(complete, true);
});

test("a failed mastery write stays retryable without submitting the review twice", async () => {
  let writes = 0;
  const { input, calls } = fixture({
    master: async () => {
      if (++writes === 1) throw new Error("offline");
    },
  });
  await assert.rejects(saveRecallProgress(input), /offline/);
  assert.equal(input.attempt.mastered, false);
  assert.equal(input.attempt.pending, null);
  assert.equal(await saveRecallProgress(input), true);
  assert.equal(writes, 2);
  assert.deepEqual(calls, [["review", "word-1", "good"]]);
});

test("a failed review never masters the word and can retry the same answer", async () => {
  let reviews = 0;
  const { input, calls } = fixture({
    review: async () => {
      if (++reviews === 1) throw new Error("offline");
    },
  });
  await assert.rejects(saveRecallProgress(input), /offline/);
  assert.deepEqual(calls, []);
  assert.equal(input.attempt.reviewed, false);
  assert.equal(await saveRecallProgress(input), true);
  assert.equal(reviews, 2);
  assert.deepEqual(calls, [["master", "word-1"]]);
});

test("wrong answers and answers using a hint remain review attempts", async () => {
  for (const [correct, hadHelp] of [
    [false, false],
    [true, true],
  ]) {
    const { input, calls } = fixture({ correct, hadHelp });
    assert.equal(await saveRecallProgress(input), true);
    assert.deepEqual(calls, [["review", "word-1", "again"]]);
    assert.equal(input.attempt.mastered, false);
  }
});

test("correcting a wrong answer requeues it; later independent recall can master it", async () => {
  const { input, calls } = fixture({ correct: false });
  await saveRecallProgress(input);
  await saveRecallProgress({ ...input, correct: true, hadHelp: true });
  assert.deepEqual(calls, [["review", "word-1", "again"]]);
  await saveRecallProgress({
    ...input,
    correct: true,
    attempt: createRecallSaveAttempt(),
  });
  assert.deepEqual(calls, [
    ["review", "word-1", "again"],
    ["review", "word-1", "good"],
    ["master", "word-1"],
  ]);
});

test("double submission shares a single pending save", async () => {
  const reviewed = deferred();
  let reviews = 0;
  const { input, calls } = fixture({
    review: async () => {
      reviews++;
      await reviewed.promise;
    },
  });
  const first = saveRecallProgress(input);
  const second = saveRecallProgress(input);
  reviewed.resolve();
  assert.deepEqual(await Promise.all([first, second]), [true, true]);
  assert.equal(reviews, 1);
  assert.deepEqual(calls, [["master", "word-1"]]);
});

test("leaving the screen before saving makes no writes", async () => {
  const { input, calls } = fixture({ isActive: () => false });
  assert.equal(await saveRecallProgress(input), false);
  assert.deepEqual(calls, []);
});

test("switching scope while reviewing stops the delayed mastery write", async () => {
  let active = true;
  const { input, calls } = fixture({
    isActive: () => active,
    review: async () => {
      active = false;
    },
  });
  assert.equal(await saveRecallProgress(input), false);
  assert.deepEqual(calls, []);
});

test("leaving during the final write cannot report completion to a stale screen", async () => {
  let active = true;
  const { input } = fixture({
    isActive: () => active,
    master: async () => {
      active = false;
    },
  });
  assert.equal(await saveRecallProgress(input), false);
});

test("save feedback is present in all four UI languages", () => {
  for (const language of ["ko", "en", "uz", "ru"]) {
    assert.deepEqual(Object.keys(wordRecallPersistence[language]).sort(), [
      "saveFailed",
      "savePending",
    ]);
    assert.ok(
      Object.values(wordRecallPersistence[language]).every((value) =>
        value.trim(),
      ),
    );
  }
});
