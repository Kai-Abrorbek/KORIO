#!/usr/bin/env node
/**
 * "Telefon lugʻati" 소리 — public/ai/ep2/v-*.mp3 (대사) · sfx-*.mp3 · music-*.mp3, src/ep2/voice.generated.json (길이)
 *   내레이터: ElevenLabs "Liam" (20대 남자, 이야기꾼) — 우즈벡어는 v4 turbo + uz
 *   이웃 아주머니: ElevenLabs "Matilda" — 놀라고 호들갑스럽게
 *   자수르의 한국어 한마디: Azure ko-KR-InJoonNeural
 *   소리 나는 대로: AI → "Ey-Ay", TOPIK → "Topik", 숫자는 글자로, oʻ/gʻ 는 ʻ(U+02BB)
 *
 *   node audio/make-ep2-audio.mjs           # 없는 것만
 *   node audio/make-ep2-audio.mjs --force   # 다시
 * 키는 apps/api/.env 에서 읽는다 (화면에 찍지 않는다).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const REPO = join(ROOT, "..", "..");
const OUT = join(ROOT, "public", "ai", "ep2");
const env = Object.fromEntries(
  readFileSync(join(REPO, "apps/api/.env"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const force = process.argv.includes("--force");
mkdirSync(OUT, { recursive: true });

const NARRATOR = "TX3LPaxmHKxFdv7VOQHJ"; // Liam
const AUNTIE = "XrExE9yKIg1WjnnlVkGX"; // Matilda

/** 이름 → [목소리, 대사]. 이름은 src/ep2 의 장면이 그대로 쓴다 */
const LINES = {
  n01: [NARRATOR, "Kechasi telefonda oʻtirsa: reelsda — bekorchi. Korioda — tirishqoq."],
  n02: [NARRATOR, "Telefonga gapirsa: reelsda — gʻalati. Korioda — Ey-Ay ustoz bilan suhbat."],
  n03: [NARRATOR, "Oʻyin oʻynasa: reelsda — vaqt ketdi. Korioda — yuzta soʻz yodladi."],
  n04: [NARRATOR, "Bu — telefon lugʻati. Telefon bir xil, tarjimasi — ekranga qarab."],
  n05: [NARRATOR, "Mana, Jasur. Soat oʻn bir, hali telefonda."],
  a01: [AUNTIE, "Voy, yarim tun-ku! Yana telefonda! Bekorchi!"],
  a02: [AUNTIE, "Bunga kim ish beradi?"],
  n06: [NARRATOR, "Shoshmang. Ekranga qarang."],
  n07: [NARRATOR, "Hangul alifbosi — oʻyin orqali, harfma-harf."],
  n08: [NARRATOR, "Har bir soʻz — oʻzbekcha tushuntirish bilan."],
  n09: [NARRATOR, "Ey-Ay ustoz bilan jonli suhbat — uyalmasdan."],
  n10: [NARRATOR, "Talaffuz — quloq farqni eshitishni oʻrganadi."],
  n11: [NARRATOR, "Topik imtihoniga — savollar bilan tayyorgarlik."],
  n12: [NARRATOR, "Seriya, liga, sovgʻalar — tashlab ketolmaysiz."],
  n13: [NARRATOR, "Bir yildan keyin. Yana soat oʻn bir, yana telefonda."],
  n14: [NARRATOR, "Faqat endi — Koreyadagi kompaniya bilan suhbat."],
  a03: [AUNTIE, "Sekinroq! Bola Koreya bilan gaplashyapti!"],
  n15: [NARRATOR, "Bir xil telefon — ekran boshqa."],
  n16: [NARRATOR, "Qoʻshni yomon odammi? Yoʻq. Hammamiz shundaymiz."],
  n18: [NARRATOR, "Bugun «bekorchi» deyishsa — xafa boʻlmang. Ular sizni emas, ekraningizni koʻryapti."],
  n19: [NARRATOR, "Oʻsha qoʻshni hozir hammaga aytadi:"],
  a04: [AUNTIE, "Men doim aytardim! Bu boladan odam chiqadi!"],
  n20: [NARRATOR, "Tarjimasi: Seuldan sovgʻa keldi."],
  n21: [NARRATOR, "Koreys tilini oʻrganaman desangiz, sizga nima deyishgan? Izohda — bitta soʻz."],
  n22: [NARRATOR, "Ekraningizni almashtiring: Korio — App Store, Google Play va Telegramda."],
};

const SFX = {
  "sfx-stamp": [1.2, "Heavy rubber stamp slammed hard onto a sheet of paper on a wooden desk, one solid thud with a little paper crinkle, close mic"],
  "sfx-typing": [1.6, "Fast typing on a smartphone touch keyboard, light quick tap clicks, close mic, no music"],
  "sfx-paper": [0.8, "Quick paper sheet whoosh swipe, one sheet flipped fast"],
  "sfx-scratch": [1.2, "Vinyl record scratch that stops the music, then sudden silence"],
  "music-a": [22, "Light rhythmic upbeat background music for a storytelling reel, plucked acoustic guitar, soft hand claps, warm bass, 104 BPM, seamless loop, no vocals"],
  "music-b": [22, "Light rhythmic upbeat background music for a storytelling reel, plucked acoustic guitar and soft marimba, finger snaps, warm bass, 104 BPM, seamless loop, no vocals"],
};

async function post(url, headers, body) {
  const response = await fetch(url, { method: "POST", headers, body });
  if (!response.ok) throw new Error(`${url.split("?")[0]} → ${response.status} ${(await response.text()).slice(0, 300)}`);
  return Buffer.from(await response.arrayBuffer());
}

for (const [name, [voice, text]] of Object.entries(LINES)) {
  const out = join(OUT, `raw-${name}.mp3`);
  if (!force && existsSync(out)) continue;
  const audio = await post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`,
    { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    JSON.stringify({
      text,
      model_id: "eleven_v4_turbo",
      language_code: "uz",
      voice_settings:
        voice === AUNTIE
          ? { stability: 0.3, similarity_boost: 0.8, style: 0.9, use_speaker_boost: true, speed: 1.05 }
          : { stability: 0.4, similarity_boost: 0.8, style: 0.6, use_speaker_boost: true, speed: 1.1 },
    }),
  );
  writeFileSync(out, audio);
  console.log(`✓ raw-${name}.mp3`);
}

// 자수르의 한국어 한마디 — 토박이 발음 (Azure)
const korean = join(OUT, "raw-k01.mp3");
if (force || !existsSync(korean)) {
  const ssml = `<speak version="1.0" xml:lang="ko-KR"><voice name="ko-KR-InJoonNeural"><prosody rate="+5%">네, 한국어로 말할 수 있습니다!</prosody></voice></speak>`;
  writeFileSync(
    korean,
    await post(
      `https://${env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
      { "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-48khz-192kbitrate-mono-mp3" },
      ssml,
    ),
  );
  console.log("✓ raw-k01.mp3");
}

// 참고 영상처럼 빠르게 — 문장부호마다 생기는 0.3~0.5초 쉼을 0.1초로 줄이고 내레이터는 1.2배
for (const name of [...Object.keys(LINES), "k01"]) {
  const tempo = LINES[name]?.[0] === NARRATOR ? 1.2 : 1.04;
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-i", join(OUT, `raw-${name}.mp3`),
    "-af", `silenceremove=start_periods=1:start_threshold=-40dB:stop_periods=-1:stop_duration=0.12:stop_threshold=-40dB:stop_silence=0.1,atempo=${tempo}`,
    "-b:a", "160k", join(OUT, `v-${name}.mp3`),
  ]);
}

for (const [name, [seconds, text]] of Object.entries(SFX)) {
  const out = join(OUT, `${name}.mp3`);
  if (!force && existsSync(out)) continue;
  const audio = await post(
    "https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128",
    { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    JSON.stringify({ text, duration_seconds: seconds, prompt_influence: 0.5 }),
  );
  writeFileSync(out, audio);
  console.log(`✓ ${name}.mp3`);
}

// 대사 길이 (프레임 계산용) — 끝의 무음은 빼고 잰다
const lengths = {};
for (const name of [...Object.keys(LINES), "k01"]) {
  const file = join(OUT, `v-${name}.mp3`);
  const log = execFileSync("ffmpeg", ["-hide_banner", "-i", file, "-af", "silencedetect=n=-40dB:d=0.25", "-f", "null", "-"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const total = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" }));
  const starts = [...String(log).matchAll(/silence_start: ([\d.]+)/g)].map((m) => Number(m[1]));
  const lastSilence = starts.length ? starts[starts.length - 1] : total;
  lengths[name] = +(lastSilence > 0.3 && total - lastSilence < 1.5 ? lastSilence : total).toFixed(2);
}
writeFileSync(join(ROOT, "src", "ep2", "voice.generated.json"), `${JSON.stringify(lengths, null, 1)}\n`);
console.log("voice.generated.json", Object.keys(lengths).length);
