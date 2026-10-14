import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import {
  DEFAULT_SPEECH_VOICE,
  DEFAULT_ENGLISH_SPEECH_VOICE,
  resolveSpeechVoice,
} from "../src/utils/speech-voice.ts";

test("learning speech uses independent Korean and English selections", () => {
  const prefs = {
    speechVoice: "ko-KR-InJoonNeural",
    englishSpeechVoice: "en-US-GuyNeural",
  };
  assert.equal(resolveSpeechVoice("ko-KR", prefs), prefs.speechVoice);
  assert.equal(resolveSpeechVoice("en-US", prefs), prefs.englishSpeechVoice);
  assert.equal(resolveSpeechVoice("uz-UZ", prefs), undefined);
  assert.equal(resolveSpeechVoice("ru-RU", prefs), undefined);
});

test("older preferences and wrong-locale selections fall back safely", () => {
  assert.equal(resolveSpeechVoice("en-US", {}), DEFAULT_ENGLISH_SPEECH_VOICE);
  assert.equal(resolveSpeechVoice("ko-KR", {}), DEFAULT_SPEECH_VOICE);
  assert.equal(
    resolveSpeechVoice("en-US", { englishSpeechVoice: "ko-KR-SunHiNeural" }),
    DEFAULT_ENGLISH_SPEECH_VOICE,
  );
});

test("previewing a different speaker does not change saved preferences", () => {
  const prefs = { englishSpeechVoice: "en-US-GuyNeural" };
  assert.equal(
    resolveSpeechVoice("en-US", prefs, " en-US-JennyNeural "),
    "en-US-JennyNeural",
  );
  assert.equal(resolveSpeechVoice("en-US", prefs), "en-US-GuyNeural");
});

test("direct TTS requests use the current setting across English learning areas", async () => {
  // Exercise the service used by every caller without native audio or a live API.
  const sound = {
    speechVoice: "ko-KR-InJoonNeural",
    englishSpeechVoice: "en-US-GuyNeural",
  };
  const requests = [];
  let isLoggedIn = true;
  const dependencies = {
    "@/services/api": {
      __esModule: true,
      default: {
        post: async (url, body) => {
          assert.equal(url, "/tts/speech");
          requests.push(body);
          return { audioId: "test-audio", expiresAt: 1 };
        },
      },
      BASE_URL: "https://example.invalid",
    },
    "@/store/auth.store": {
      useAuthStore: { getState: () => ({ isLoggedIn }) },
    },
    "@/store/onboarding.store": {
      useOnboardingStore: { getState: () => ({ sessionId: "test-session" }) },
    },
    "@/store/settings.store": {
      useSettingsStore: { getState: () => ({ sound }) },
    },
    "@/utils/speech-voice": { resolveSpeechVoice },
  };
  const compiled = ts.transpileModule(
    readFileSync(
      new URL("../src/services/tts.service.ts", import.meta.url),
      "utf8",
    ),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: (name) => {
      assert.ok(dependencies[name], `Unexpected dependency: ${name}`);
      return dependencies[name];
    },
  });
  const request = { text: "A", language: "en-US", rate: 1, gender: "female" };
  const service = exports.TtsService;
  assert.equal(
    await service.prepareSource(request),
    "https://example.invalid/tts/speech/test-audio",
  );
  assert.equal(requests.at(-1).voice, "en-US-GuyNeural");
  sound.englishSpeechVoice = "en-US-JennyNeural";
  await service.prepareSource({ ...request, text: "apple" });
  assert.equal(requests.at(-1).voice, "en-US-JennyNeural");
  await service.prepareSource({
    ...request,
    language: "ko-KR",
    text: "안녕하세요",
  });
  assert.equal(requests.at(-1).voice, "ko-KR-InJoonNeural");
  await service.prepareSource({ ...request, voice: "en-US-GuyNeural" });
  assert.equal(requests.at(-1).voice, "en-US-GuyNeural");
  assert.equal(sound.englishSpeechVoice, "en-US-JennyNeural");
  isLoggedIn = false;
  await service.prepareSource(request);
  assert.equal(requests.at(-1).sessionId, "test-session");
  assert.equal(requests.at(-1).voice, "en-US-JennyNeural");
});
