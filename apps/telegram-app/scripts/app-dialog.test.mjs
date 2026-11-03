import assert from "node:assert/strict";
import { test } from "node:test";
import {
  currentAppDialog,
  enqueueAppDialog,
  finishAppDialog,
  subscribeAppDialogs,
} from "../src/shared/telegram/app-dialog-state.ts";

test("queued confirmations and alerts retain order and resolve only once", async () => {
  let notifications = 0;
  const unsubscribe = subscribeAppDialogs(() => notifications++);
  const first = enqueueAppDialog("confirm", "First purchase?");
  const firstId = currentAppDialog().id;
  const second = enqueueAppDialog("alert", "Purchase saved.");
  finishAppDialog(firstId + 1, true);
  assert.equal(currentAppDialog().message, "First purchase?");
  finishAppDialog(firstId, false);
  assert.equal(await first, false);
  assert.equal(currentAppDialog().kind, "alert");
  finishAppDialog(firstId, true);
  assert.equal(currentAppDialog().message, "Purchase saved.");
  finishAppDialog(currentAppDialog().id, true);
  assert.equal(await second, true);
  assert.equal(currentAppDialog(), null);
  assert.equal(notifications, 4);
  unsubscribe();
  const third = enqueueAppDialog("alert", "Done");
  finishAppDialog(currentAppDialog().id, true);
  await third;
  assert.equal(notifications, 4);
});
