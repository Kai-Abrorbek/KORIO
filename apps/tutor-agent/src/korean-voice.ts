import type { ReadableStream as WebReadableStream } from 'node:stream/web';
import { ReadableStream } from 'node:stream/web';
import type { AudioFrame } from '@livekit/rtc-node';
import { llm, type APIConnectOptions } from '@livekit/agents';
import * as google from '@livekit/agents-plugin-google';
import { z } from 'zod';
import {
  SAY_KOREAN,
  SAY_KOREAN_DESCRIPTION,
  SAY_KOREAN_RESULT,
  SAY_KOREAN_TEXT_DESCRIPTION,
  koreanOnly,
} from './korean-voice-spec.js';

/**
 * 한국어 전용 목소리.
 *
 * ── 왜 필요한가 ──
 *
 * Gemini Live 는 한 턴의 소리를 **하나의 흐름으로 통째로** 만든다. 한 턴 안에
 * 우즈벡어와 한국어가 같이 있으면:
 *   · 한국어가 우즈벡어 발음으로 읽히고
 *   · 심하면 한국어 문장을 말하다가 우즈벡어로 새 버린다
 *     ("공항에 어떻게 가요?" → "공항에 qanday qayo")
 * 반대로 한 언어만 말할 때는 둘 다 멀쩡하다 (실기기에서 확인됨).
 * 프롬프트로 "문장을 나눠서 말해라" 를 아무리 세게 써도 안 고쳐졌다 —
 * 결국 한 번에 만드는 소리라서다.
 *
 * 그래서 **소리를 만드는 단위를 무조건 한 언어로** 만든다:
 *
 *   Gemini Live (선생님 목소리)  → 설명 언어만 말한다
 *   say_korean  (이 파일)        → 한국어만, 같은 목소리의 Gemini TTS 로
 *
 * ── 왜 Gemini TTS 인가 ──
 *
 * Live 와 TTS 는 같은 목소리 세트를 쓴다 (Laomedeia, Achernar …). 그래서
 * 같은 voiceName 으로 부르면 **같은 사람**으로 들린다. Azure ko-KR 이 발음은
 * 좋지만 다른 사람 목소리라, 선생님이 한국어만 딴 사람 목소리로 말하게 된다.
 *
 * (전부 TTS 로 돌리는 방법은 못 쓴다 — Gemini TTS 지원 언어에 우즈벡어가
 *  없고, gemini-3.8-live 는 소리로만 답해서 글자만 받아올 수도 없다)
 */

/**
 * 한국어 한 마디는 짧다. 재시도로 몇 초씩 끌면 선생님이 멈춘 것처럼 들린다.
 * 네트워크가 잠깐 튄 경우만 한 번 빠르게 다시 해본다.
 * (플러그인 기본값은 2초 간격 3회 — 429 에서는 쿼터만 태운다)
 */
const TTS_CONN: APIConnectOptions = {
  maxRetry: 1,
  retryIntervalMs: 250,
  timeoutMs: 10_000,
};

/**
 * TTS 결과를 say() 가 받는 오디오 스트림으로 흘린다.
 *
 * 문장이 다 만들어질 때까지 기다리지 않는다 — Gemini TTS 는
 * generateContentStream 으로 조각을 보내주므로, 첫 조각부터 바로 재생된다.
 *
 * ⚠️ 합성이 실패해도 **에러를 흘려보내지 않고 조용히 닫는다.** say() 쪽에서
 *    에러가 터지면 그 발화가 에러로 끝나는 대신, 여기서 센 프레임 수로 실패를
 *    판단해서 모델에게 알려준다 (아래 execute).
 */
function audioOf(
  tts: google.beta.TTS,
  text: string,
  onFrame: () => void,
): WebReadableStream<AudioFrame> {
  const chunked = tts.synthesize(text, TTS_CONN);
  return new ReadableStream<AudioFrame>({
    async pull(controller) {
      try {
        const r = await chunked.next();
        if (r.done) {
          controller.close();
          return;
        }
        onFrame();
        controller.enqueue(r.value.frame);
      } catch {
        controller.close();
      }
    },
    cancel() {
      // 학습자가 끼어들어서 재생이 끊기면 합성도 멈춘다 (쿼터 절약)
      chunked.close();
    },
  });
}

/** LiveKit 도구 인자. 설명 문자열은 korean-voice-spec.ts 가 주인이다 */
const sayKoreanParameters = z.object({
  text: z.string().describe(SAY_KOREAN_TEXT_DESCRIPTION),
});

export interface KoreanVoice {
  tools: { [SAY_KOREAN]: ReturnType<typeof sayKoreanTool> };
  close: () => Promise<void>;
}

function sayKoreanTool(tts: google.beta.TTS, log: (m: string) => void) {
  return llm.tool({
    description: SAY_KOREAN_DESCRIPTION,
    parameters: sayKoreanParameters,
    execute: async ({ text }, { ctx }) => {
      const korean = koreanOnly(text);
      if (!korean) {
        log(`say_korean 거절 — 한국어 외 문자가 섞임: "${text}"`);
        return SAY_KOREAN_RESULT.rejected;
      }
      log(`say_korean: "${korean}"`);

      // 1) 합성을 **먼저** 건다. 앞말("Qani, takrorlang.")이 재생되는 동안
      //    한국어가 만들어지므로, 앞말이 끝나는 순간 거의 바로 이어진다.
      //    (합성 요청은 synthesize() 를 부르는 즉시 나간다)
      let frames = 0;
      const audio = audioOf(tts, korean, () => {
        frames += 1;
      });

      // 2) 도구를 부르기 직전까지 한 말이 끝날 때까지 기다린다.
      //    안 기다리면 우즈벡어 위에 한국어가 겹쳐 나온다.
      await ctx.waitForPlayout();

      // 3) 한국어 재생.
      //    ⚠️ 다른 발화를 도구 안에서 기다리는 건 안전하다 — SpeechHandle 타입
      //       주석에 명시돼 있다 (자기 자신을 기다릴 때만 순환 대기가 된다).
      //    addToChatCtx: false — 무슨 말을 했는지는 이 도구 호출 인자로 이미
      //    모델 문맥에 있다. 모델이 만들지 않은 assistant 메시지를 끼워 넣지 않는다.
      const handle = ctx.session.say(korean, {
        audio,
        allowInterruptions: true,
        addToChatCtx: false,
      });
      await handle.waitForPlayout();

      if (handle.interrupted) {
        return SAY_KOREAN_RESULT.interrupted;
      }
      if (frames === 0) {
        log(`say_korean 실패 — 소리가 안 나왔다: "${korean}"`);
        // 자막은 이미 떴다 (say 가 글자를 먼저 보낸다). 모델이 직접 발음하면
        // 이 수정 전체가 무너지므로, 화면을 가리키게 한다.
        return SAY_KOREAN_RESULT.failed;
      }
      return SAY_KOREAN_RESULT.played;
    },
  });
}

/**
 * 세션 하나에 한 벌. TTS 연결을 재사용한다.
 *
 * ⚠️ 이 TTS 를 AgentSession 의 `tts` 로 넘기지 않는다. 세션 TTS 의 에러는
 *    세션 에러로 올라가서, 한국어 한 마디가 429 를 맞는 순간 **통화가 통째로
 *    끊길 수 있다.** 따로 들고 있으면 실패해도 그 한 마디만 조용히 빠진다.
 */
export function createKoreanVoice(
  voiceName: string,
  log: (m: string) => void,
): KoreanVoice {
  const tts = new google.beta.TTS({ voiceName });
  // ⚠️ 리스너가 없으면 emit('error') 가 ERR_UNHANDLED_ERROR 로 터진다
  //    (미리듣기 스크립트에서 실제로 프로세스가 죽었던 원인)
  //
  // ⚠️ 합성이 실패하면 같은 에러가 **주인 없는 promise rejection** 으로도 뜬다
  //    (ChunkedStream 이 생성자에서 작업을 catch 없이 띄운다). 스크립트였다면
  //    프로세스가 죽지만, 여기선 안전하다: LiveKit 은 잡을 항상
  //    JobProcExecutor → job_proc_lazy_main 으로 포크해서 돌리고(ipc/proc_pool.js),
  //    그 프로세스에 process.on('unhandledRejection') 이 달려 있다
  //    (ipc/job_proc_lazy_main.js). @livekit/agents 를 올릴 때 이게 그대로인지
  //    확인할 것 — 사라지면 한국어 한 마디 실패로 통화가 끊긴다.
  tts.on('error', (e) => {
    log(`한국어 TTS 오류: ${e.error.message}`);
  });

  return {
    tools: { [SAY_KOREAN]: sayKoreanTool(tts, log) },
    close: () => tts.close(),
  };
}
