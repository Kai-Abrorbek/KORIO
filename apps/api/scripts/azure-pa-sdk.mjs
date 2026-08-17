/**
 * Speech SDK 로 발음 평가를 시험한다. REST 경로에서 PA 블록이 안 오는 게
 * (a) REST 경로 문제인지 (b) 리전/리소스 자체가 PA 를 못 하는지 가르는 테스트.
 *
 *   pnpm --filter api add microsoft-cognitiveservices-speech-sdk
 *   node scripts/azure-pa-sdk.mjs
 *   node scripts/azure-pa-sdk.mjs .speech-debug/167xxxx.wav
 */
import fs from 'node:fs';

for (const line of fs.existsSync('.env')
  ? fs.readFileSync('.env', 'utf8').split(/\r?\n/)
  : []) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const KEY = (process.env.AZURE_SPEECH_KEY || '').trim();
const REGION = (process.env.AZURE_SPEECH_REGION || 'koreacentral').trim();
const REFERENCE = process.argv[3] || '안녕하십니까?';
const WAV = process.argv[2] || 'tts-sample.wav';

let sdk;
try {
  sdk = await import('microsoft-cognitiveservices-speech-sdk');
} catch {
  console.error(`SDK 가 없다. 먼저 설치:
  pnpm --filter api add microsoft-cognitiveservices-speech-sdk`);
  process.exit(1);
}

if (!fs.existsSync(WAV)) {
  console.error(`${WAV} 가 없다. 먼저 node scripts/azure-speech-check.mjs 로 tts-sample.wav 를 만들어라.`);
  process.exit(1);
}

console.log(`region=${REGION} 파일=${WAV} 참조="${REFERENCE}"\n`);

const speechConfig = sdk.SpeechConfig.fromSubscription(KEY, REGION);
speechConfig.speechRecognitionLanguage = 'ko-KR';

const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(WAV));

const paConfig = new sdk.PronunciationAssessmentConfig(
  REFERENCE,
  sdk.PronunciationAssessmentGradingSystem.HundredMark,
  sdk.PronunciationAssessmentGranularity.Word,
  false, // enableMiscue
);

const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
paConfig.applyTo(recognizer);

recognizer.recognizeOnceAsync(
  (result) => {
    console.log('reason:', sdk.ResultReason[result.reason]);
    console.log('text:', JSON.stringify(result.text));

    if (result.reason === sdk.ResultReason.Canceled) {
      const d = sdk.CancellationDetails.fromResult(result);
      console.log('취소사유:', sdk.CancellationReason[d.reason], d.errorDetails);
    }

    try {
      const pa = sdk.PronunciationAssessmentResult.fromResult(result);
      if (pa && pa.pronunciationScore !== undefined) {
        console.log(`
✅ 발음 평가 성공
   PronScore    : ${pa.pronunciationScore}
   Accuracy     : ${pa.accuracyScore}
   Fluency      : ${pa.fluencyScore}
   Completeness : ${pa.completenessScore}`);
        const words = pa.detailResult?.Words ?? [];
        console.log('   단어별      :',
          words.map((w) => `${w.Word}(${w.PronunciationAssessment?.AccuracyScore}/${w.PronunciationAssessment?.ErrorType})`).join(' '));
        console.log(`
→ SDK 는 되는데 REST 만 안 되는 것. 서버를 SDK 로 갈아끼우면 해결된다.`);
      } else {
        console.log(`
❌ SDK 로도 발음 평가 결과가 비어 있다.
→ koreacentral 리전 또는 이 리소스가 발음 평가를 지원하지 않는 것.
   다른 리전(japaneast, southeastasia, eastus)에 Speech 리소스를 새로 만들어야 한다.`);
      }
    } catch (e) {
      console.log('\n❌ PA 결과 파싱 실패:', e.message);
      console.log('원본 JSON:', result.properties?.getProperty(
        sdk.PropertyId.SpeechServiceResponse_JsonResult) ?? '(없음)');
    }
    recognizer.close();
  },
  (err) => {
    console.error('인식 실패:', err);
    recognizer.close();
  },
);
