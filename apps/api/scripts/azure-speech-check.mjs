/**
 * Azure 발음 평가 진단 스크립트.
 *
 * 왜 필요한가: 앱에서 0점이 나올 때 원인이 (a) 녹음된 오디오가 문제인지
 * (b) Azure 요청 자체가 문제인지 구분이 안 된다. TTS 로 "완벽한" 음성을 만들어
 * 그대로 발음 평가에 넣으면 그 두 가지가 갈린다.
 *
 *   node scripts/azure-speech-check.mjs                 # TTS 왕복 테스트
 *   node scripts/azure-speech-check.mjs 녹음파일.wav     # 실제 녹음 파일 검사
 *   node scripts/azure-speech-check.mjs 녹음파일.wav "안녕하십니까?"
 */
import fs from 'node:fs';
import path from 'node:path';

const ENV_PATH = path.resolve(process.cwd(), '.env');
for (const line of fs.existsSync(ENV_PATH)
  ? fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)
  : []) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) {
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const KEY = (process.env.AZURE_SPEECH_KEY || '').trim();
const REGION = (process.env.AZURE_SPEECH_REGION || 'koreacentral').trim();
if (!KEY) {
  console.error('AZURE_SPEECH_KEY 가 .env 에 없다. apps/api 에서 실행했는지 확인.');
  process.exit(1);
}

const REFERENCE = process.argv[3] || '안녕하십니까?';
const WAV_ARG = process.argv[2];

/** 16kHz 모노 16bit PCM WAV 의 파형 통계 */
function wavStats(buf) {
  if (buf.length < 44 || buf.toString('ascii', 0, 4) !== 'RIFF') {
    return { error: 'RIFF 헤더 아님' };
  }
  let peak = 0;
  let sumSquares = 0;
  let n = 0;
  for (let i = 44; i + 1 < buf.length; i += 2) {
    const v = buf.readInt16LE(i);
    const abs = v < 0 ? -v : v;
    if (abs > peak) peak = abs;
    sumSquares += v * v;
    n++;
  }
  return {
    format: buf.readUInt16LE(20),
    channels: buf.readUInt16LE(22),
    sampleRate: buf.readUInt32LE(24),
    bits: buf.readUInt16LE(34),
    seconds: +(n / (buf.readUInt32LE(24) || 16000)).toFixed(2),
    peakPct: Math.round((peak / 32767) * 100),
    rms: n ? Math.round(Math.sqrt(sumSquares / n)) : 0,
  };
}

async function synthesize(text) {
  const url = `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const ssml =
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR">` +
    `<voice name="ko-KR-SunHiNeural">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</voice></speak>`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ssml+xml',
      'Ocp-Apim-Subscription-Key': KEY,
      // 발음 평가가 요구하는 포맷 그대로 뽑는다
      'X-Microsoft-OutputFormat': 'riff-16khz-16bit-mono-pcm',
      'User-Agent': 'Korio-Diag',
    },
    body: ssml,
  });
  if (!res.ok) {
    throw new Error(`TTS 실패 ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function assess(wav, referenceText, label) {
  const params = {
    ReferenceText: referenceText,
    GradingSystem: 'HundredMark',
    Granularity: 'Word',
    Dimension: 'Comprehensive',
  };
  const url =
    `https://${REGION}.stt.speech.microsoft.com` +
    `/speech/recognition/conversation/cognitiveservices/v1?language=ko-KR&format=detailed`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
      'Ocp-Apim-Subscription-Key': KEY,
      'User-Agent': 'Korio-Diag',
      'Pronunciation-Assessment': Buffer.from(
        JSON.stringify(params),
        'utf8',
      ).toString('base64'),
    },
    body: wav,
  });

  const reqId = res.headers.get('x-requestid') || '';
  const text = await res.text();
  console.log(`\n── ${label} ──`);
  console.log('오디오:', JSON.stringify(wavStats(wav)));
  console.log('HTTP:', res.status, 'reqId:', reqId);

  if (!res.ok) {
    console.log('본문:', text.slice(0, 600));
    return;
  }

  const body = JSON.parse(text);
  const best = body.NBest?.[0];
  const pa = best?.PronunciationAssessment;

  console.log('RecognitionStatus:', body.RecognitionStatus);
  console.log('DisplayText:', JSON.stringify(body.DisplayText));
  console.log('PronunciationAssessment:', pa ? JSON.stringify(pa) : '❌ 없음');
  console.log(
    'Words:',
    best?.Words
      ? best.Words.map(
          (w) =>
            `${w.Word}(${w.PronunciationAssessment?.AccuracyScore ?? '?'}/${w.PronunciationAssessment?.ErrorType ?? '?'})`,
        ).join(' ')
      : '❌ 없음',
  );
}

const main = async () => {
  console.log(`region=${REGION} 참조문장="${REFERENCE}"`);

  if (WAV_ARG) {
    await assess(fs.readFileSync(WAV_ARG), REFERENCE, `실제 녹음 파일 (${WAV_ARG})`);
    return;
  }

  const wav = await synthesize(REFERENCE);
  fs.writeFileSync('tts-sample.wav', wav);
  console.log('TTS 샘플 저장: apps/api/tts-sample.wav (직접 들어봐도 됨)');
  await assess(wav, REFERENCE, 'TTS 로 만든 완벽한 발음');

  console.log(`
──────────────────────────────────────────────
읽는 법
  PronunciationAssessment 가 나오고 점수 90+ →
      Azure 요청은 정상. 앱에서 녹음된 오디오가 문제다.
  PronunciationAssessment 가 ❌ 없음 또는 점수 0 →
      Azure 요청/설정 문제. 이 출력 전체를 그대로 보내줘.
──────────────────────────────────────────────`);
};

main().catch((e) => {
  console.error('실패:', e.message);
  process.exit(1);
});
