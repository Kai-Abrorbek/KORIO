/**
 * 발음 평가 헤더가 무시되는 원인을 찾는 변형 매트릭스.
 * 같은 오디오로 조건만 바꿔 여러 번 호출하고, 어느 조합에서
 * PronunciationAssessment 블록이 돌아오는지 본다.
 *
 *   node scripts/azure-pa-matrix.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

for (const line of fs.existsSync('.env')
  ? fs.readFileSync('.env', 'utf8').split(/\r?\n/)
  : []) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const KEY = (process.env.AZURE_SPEECH_KEY || '').trim();
const REGION = (process.env.AZURE_SPEECH_REGION || 'koreacentral').trim();
const ENDPOINT = (process.env.AZURE_SPEECH_ENDPOINT || '').trim();
const REFERENCE = '안녕하십니까?';

if (!KEY) { console.error('.env 의 AZURE_SPEECH_KEY 없음'); process.exit(1); }

console.log(`region=${REGION}`);
console.log(`endpoint=${ENDPOINT || '(비어 있음)'}\n`);

const LEGACY_HOST = `${REGION}.stt.speech.microsoft.com`;
const PATH = '/speech/recognition/conversation/cognitiveservices/v1?language=ko-KR&format=detailed';

// AZURE_SPEECH_ENDPOINT 가 커스텀 도메인이면 /stt 프리픽스 경로도 시험한다
let customHost = null;
if (ENDPOINT) { try { customHost = new URL(ENDPOINT).hostname; } catch { /* 무시 */ } }

async function getWav() {
  if (fs.existsSync('tts-sample.wav')) return fs.readFileSync('tts-sample.wav');
  const res = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ssml+xml',
      'Ocp-Apim-Subscription-Key': KEY,
      'X-Microsoft-OutputFormat': 'riff-16khz-16bit-mono-pcm',
      'User-Agent': 'Korio-Diag',
    },
    body: `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ko-KR"><voice name="ko-KR-SunHiNeural">${REFERENCE}</voice></speak>`,
  });
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync('tts-sample.wav', buf);
  return buf;
}

/**
 * node:https 로 직접 보낸다. fetch(undici)는 헤더 이름을 소문자로 눕히는데,
 * Azure 게이트웨이가 대소문자를 가리는 경우를 배제해야 하기 때문.
 */
function post(host, urlPath, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { host, path: urlPath, method: 'POST', headers },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () =>
          resolve({
            status: res.statusCode,
            reqId: res.headers['x-requestid'] || '',
            text: Buffer.concat(chunks).toString('utf8'),
          }),
        );
      },
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function run(label, { host = LEGACY_HOST, urlPath = PATH, params, pad = true, accept = 'application/json', wav }) {
  let b64 = Buffer.from(JSON.stringify(params), 'utf8').toString('base64');
  if (!pad) b64 = b64.replace(/=+$/, '');

  try {
    const res = await post(host, urlPath, {
      'Accept': accept,
      'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
      'Ocp-Apim-Subscription-Key': KEY,
      'User-Agent': 'Korio-Diag',
      'Pronunciation-Assessment': b64,
      'Content-Length': wav.length,
    }, wav);

    if (res.status !== 200) {
      console.log(`❌ ${label}\n     HTTP ${res.status} ${res.text.slice(0, 200)}`);
      return;
    }
    const body = JSON.parse(res.text);
    const best = body.NBest?.[0];
    const pa = best?.PronunciationAssessment;
    const wordPa = best?.Words?.[0]?.PronunciationAssessment;

    if (pa) {
      console.log(`✅ ${label}\n     PronScore=${pa.PronScore} Accuracy=${pa.AccuracyScore} Completeness=${pa.CompletenessScore} Fluency=${pa.FluencyScore}`);
      console.log(`     단어단위: ${wordPa ? JSON.stringify(wordPa) : '없음'}`);
    } else {
      console.log(`❌ ${label}\n     status=${body.RecognitionStatus} text="${body.DisplayText}" → PA 블록 없음 (reqId=${res.reqId})`);
    }
  } catch (e) {
    console.log(`❌ ${label}\n     ${e.message}`);
  }
}

const BASE = { ReferenceText: REFERENCE, GradingSystem: 'HundredMark', Granularity: 'Word' };

const main = async () => {
  const wav = await getWav();
  console.log(`오디오 ${wav.length} bytes\n`);

  await run('1. 현재 설정 (Comprehensive, 지역 호스트)', { params: { ...BASE, Dimension: 'Comprehensive' }, wav });
  await run('2. Dimension=Basic', { params: { ...BASE, Dimension: 'Basic' }, wav });
  await run('3. Dimension 없음', { params: BASE, wav });
  await run('4. EnableMiscue 추가', { params: { ...BASE, Dimension: 'Comprehensive', EnableMiscue: 'False' }, wav });
  await run('5. base64 패딩 제거', { params: { ...BASE, Dimension: 'Comprehensive' }, pad: false, wav });
  await run('6. Accept: application/json;text/xml', { params: { ...BASE, Dimension: 'Comprehensive' }, accept: 'application/json;text/xml', wav });
  await run('7. Granularity=Phoneme', { params: { ...BASE, Granularity: 'Phoneme', Dimension: 'Comprehensive' }, wav });
  await run('8. 참조문장에서 물음표 제거', { params: { ...BASE, ReferenceText: '안녕하십니까', Dimension: 'Comprehensive' }, wav });

  if (customHost) {
    await run(`9. 커스텀 도메인 (${customHost}, /stt 경로)`, {
      host: customHost, urlPath: '/stt' + PATH,
      params: { ...BASE, Dimension: 'Comprehensive' }, wav,
    });
    await run(`10. 커스텀 도메인 (${customHost}, /stt 없이)`, {
      host: customHost, urlPath: PATH,
      params: { ...BASE, Dimension: 'Comprehensive' }, wav,
    });
  } else {
    console.log('\n(AZURE_SPEECH_ENDPOINT 가 비어 있어 커스텀 도메인 테스트는 건너뜀)');
  }

  console.log('\n✅ 가 하나라도 있으면 그 조합으로 코드를 맞추면 된다.');
  console.log('전부 ❌ 면 이 리소스에서 발음 평가가 아예 안 켜진 것 — 출력 그대로 보내줘.');
};

main().catch((e) => { console.error(e); process.exit(1); });
