import { fileURLToPath } from 'node:url';
import {
  ServerOptions,
  cli,
  defineAgent,
  llm,
  voice,
  type JobContext,
} from '@livekit/agents';
import * as google from '@livekit/agents-plugin-google';
import { Behavior, EndSensitivity, StartSensitivity } from '@google/genai';
import {
  AGENT_NAME,
  FALLBACK_MODEL,
  OPENING_DIRECTIVE,
  OPENING_DIRECTIVE_TOOL_FIRST_CALL,
  VAD_SILENCE_MS,
  WAIT_FOR_LEARNER_SEC,
  lockableOutputLanguage,
  transcriptionLanguages,
  tutorOutputLanguage,
} from './config.js';
import { decodeDispatchMetadata } from './metadata.js';
import { createKoreanVoice } from './korean-voice.js';
import {
  SAY_KOREAN,
  SPOKEN_PROMPT_LEAK,
  SPOKEN_TOOL_NOTATION,
  containsSpokenKorean,
} from './korean-voice-spec.js';

/**
 * KORIO Tutor Agent.
 *
 *   앱 ──WebRTC──▶ LiveKit ──▶ [여기] ──Gemini Live──▶ gemini-3.8-live
 *
 * 이 프로세스가 하는 일은 딱 하나다: **방 하나에 들어가서 Gemini 와
 * 학습자를 이어준다.**
 *
 * 하지 않는 일이 더 중요하다:
 *  · DB 를 읽지 않는다. 학습자 프로필도 오답 장부도 안 본다.
 *  · 프롬프트를 만들지 않는다. 완성본을 metadata 로 받는다.
 *  · STT/TTS 를 붙이지 않는다. Gemini 가 소리를 직접 듣고 직접 낸다.
 *  · 끼어들기(barge-in)를 직접 구현하지 않는다. AgentSession 이 한다.
 *
 * 개인화 로직이 두 군데로 갈라지면, 튜터가 이상하게 굴 때 어느 쪽 프롬프트
 * 때문인지 알 수가 없다. 그래서 전부 KORIO API 한 곳에 둔다.
 */
export default defineAgent({
  entry: async (ctx: JobContext) => {
    /**
     * ⚠️ 제일 먼저, 그리고 시끄럽게.
     *
     * API 와 Agent 는 따로 배포된다. 배포 시점이 어긋나면 instructions 자리에
     * undefined 가 들어가고, 그러면 튜터가 아무 지시 없이 말하기 시작한다.
     * 그건 조용히 잘못 도는 것이라 제일 늦게 발견된다 — 차라리 여기서 죽는다.
     */
    const meta = decodeDispatchMetadata(ctx.job.metadata);
    const log = (msg: string) =>
      console.log(`[tutor ${meta.sessionId}] ${msg}`);

    /**
     * 한국어는 선생님 목소리가 아니라 say_korean 도구로 낸다 (korean-voice.ts).
     * API 가 프롬프트를 그 전제로 만들었을 때만 켠다 — 둘은 같이 움직인다.
     */
    const toolVoice = meta.koreanVoice === 'tool';

    log(
      `방 입장 · teacher=${meta.teacherId} voice=${meta.voiceName} ` +
        `mode=${meta.mode} lang=${meta.teachingLanguage} ` +
        `address=${meta.addressStyle} max=${meta.maxDurationSec}s ` +
        `korean=${toolVoice ? 'tool' : 'native'}`,
    );

    await ctx.connect();

    /**
     * Live 출력 언어를 설명 언어로 못 박을 수 있는지 **학습자를 기다리는 동안**
     * 확인해 둔다 (config.ts 의 lockableOutputLanguage — 서버가 코드를 거부하면
     * 튜터가 통째로 안 붙기 때문). 병렬이라 보통은 기다리는 시간이 안 늘어난다.
     */
    const liveModel = meta.model || FALLBACK_MODEL;
    const languageCheck = toolVoice
      ? lockableOutputLanguage(liveModel, meta.teachingLanguage)
      : null;

    /**
     * 아무도 안 들어오면 접는다.
     *
     * 토큰만 받고 연결을 안 하는 경우가 실제로 있다. 그때 Agent 가 방에
     * 남아 Gemini 세션을 붙들고 있으면 **아무도 안 듣는 대화에 돈이 나간다.**
     */
    const learner = await Promise.race([
      ctx.waitForParticipant(),
      new Promise<null>((r) => setTimeout(() => r(null), WAIT_FOR_LEARNER_SEC * 1000)),
    ]);
    if (!learner) {
      log(`${WAIT_FOR_LEARNER_SEC}초 동안 아무도 안 들어와서 종료`);
      ctx.shutdown('learner_never_joined');
      return;
    }

    const koreanVoice = toolVoice ? createKoreanVoice(meta.voiceName, log) : null;

    /**
     * 확인 결과를 기다리되 **1.5초까지만.** 그 안에 안 끝나면 코드 없이 간다
     * (결과는 캐시돼서 이 프로세스의 다음 통화부터 쓰인다). 통화 시작이 느려지는
     * 것보다 한 겹 덜 막는 게 낫다 — 프롬프트와 say_korean 검증은 그대로다.
     */
    let lockLanguage: string | undefined;
    if (languageCheck) {
      const want = tutorOutputLanguage(meta.teachingLanguage);
      const r = await Promise.race([
        languageCheck,
        new Promise<null>((res) => setTimeout(() => res(null), 1500)),
      ]);
      if (!r) {
        log(`⚠️ Live 출력 언어 확인이 1.5초 안에 안 끝남 — ${want} 고정 없이 진행`);
      } else if (r.code) {
        lockLanguage = r.code;
        log(`Live 출력 언어 고정: ${r.code} (${r.report})`);
      } else {
        log(`⚠️ Live 가 출력 언어 코드를 안 받음 — 고정 없이 진행 (${r.report})`);
      }
    }

    const langHints = transcriptionLanguages(meta.teachingLanguage);
    log(`자막 언어 힌트: ${langHints.join(', ')} · VAD 침묵 ${VAD_SILENCE_MS}ms`);

    const session = new voice.AgentSession({
      llm: new google.realtime.RealtimeModel({
        // 모델은 **API 가 정한다.** Agent 를 다시 배포하지 않고 갈아 끼우려고
        model: liveModel,
        voice: meta.voiceName,
        instructions: meta.instructions,

        /**
         * 선생님 목소리(Live)는 설명 언어 **하나만** 말한다.
         * 우즈벡어 수업이면 uz-UZ 로 고정 — 한국어는 Live 가 말하지 않고
         * say_korean 만 말한다. (서버가 받아주는 코드일 때만. 위 확인 참고)
         */
        ...(lockLanguage ? { language: lockLanguage } : {}),

        /**
         * 자막. 화면과 종료 분석에 둘 다 필요해서 양쪽을 명시적으로 켠다.
         *
         * languageCodes 는 **고정이 아니라 힌트다** (비우면 자동 감지).
         * 이 오디오에는 한국어와 학습자 모국어 두 가지만 나오므로 그 둘을
         * 알려준다 — code-switching 자막 정확도가 이걸로 갈린다.
         */
        inputAudioTranscription: { languageCodes: langHints },
        outputAudioTranscription: { languageCodes: langHints },

        /**
         * 턴 감지. 초급자가 단어를 떠올리며 멈추는 걸 "말 끝남" 으로 보지
         * 않게 한다 (config.ts 의 긴 주석 참고).
         *
         * ⚠️ Gemini Live 기본값이 start=HIGH / end=HIGH 라, 실제로 바꾸는
         *    건 end 쪽이다. start 는 기본과 같지만 의도를 남기려고 적는다.
         */
        realtimeInputConfig: {
          automaticActivityDetection: {
            startOfSpeechSensitivity: StartSensitivity.START_SENSITIVITY_HIGH,
            endOfSpeechSensitivity: EndSensitivity.END_SENSITIVITY_LOW,
            silenceDurationMs: VAD_SILENCE_MS,
          },
        },

        // 긴 대화에서 문맥이 한도를 넘으면 세션이 그냥 끊긴다.
        // 오래된 turn 부터 밀어내서 대화를 살려 둔다
        contextWindowCompression: { slidingWindow: {} },

        /**
         * ⚠️ say_korean 은 **BLOCKING** 이어야 한다.
         *
         * gemini-3.8-live 의 기본값은 NON_BLOCKING 이다 — 도구를 불러놓고
         * 결과를 안 기다린 채 계속 말한다. 그러면 "Qani, takrorlang." 다음에
         * 한국어가 나와야 할 자리에서 선생님이 다음 설명으로 넘어가 버리고,
         * 한국어는 그 뒤에 엉뚱하게 붙는다.
         * BLOCKING 이면 도구 결과(= 한국어 재생 끝)를 받을 때까지 멈춘다:
         *   우즈벡어 → [한국어] → 우즈벡어 순서가 보장된다.
         */
        ...(toolVoice ? { toolBehavior: Behavior.BLOCKING } : {}),

        /**
         * ⚠️ 여기 **넣으면 안 되는 것들** (3.8 Live 기준):
         *
         *   thinkingConfig — 3.8 Live 는 MINIMAL 고정이다. 회화에서 중요한 건
         *     추론 깊이가 아니라 **첫 소리가 언제 나오느냐**다. 건드리지 않는다.
         *   enableAffectiveDialog — 3.8 Live 에는 이 노브가 없다. 기본 동작이다.
         *   proactivity — 항상 켜져 있다. 끄면 "학습자가 단어를 떠올리는 동안
         *     끼어들지 않는" 동작이 사라진다.
         *   geminiTools — 지연과 비용만 는다. 한국어 회화에 검색이 왜 필요한가.
         */
      }),

      /**
       * 턴 감지는 **Gemini 가 한다.**
       *
       * vad 를 비우면 AgentSession 이 silero VAD 를 자동으로 얹는데,
       * realtime 모델은 서버에서 이미 턴을 잡고 있어서 두 겹이 된다.
       * (모델 다운로드 + CPU 만 늘고 끼어들기 판정이 서로 엇갈린다)
       */
      vad: null,
      turnHandling: { turnDetection: 'realtime_llm' },
    });

    /**
     * 시간 상한.
     *
     * 앱에도 같은 타이머가 있지만 그건 앱을 고치면 우회된다.
     * 돈이 나가는 건 여기 ↔ Gemini 구간이라 **끊는 책임도 여기 있어야 한다.**
     */
    const hardStop = setTimeout(() => {
      log(`상한 ${meta.maxDurationSec}초 도달 — 종료`);
      ctx.shutdown('max_duration');
    }, meta.maxDurationSec * 1000);

    /**
     * 통화 한 번이 "한국어를 도구로 냈는가" 를 **로그 한 줄로** 판정하려는 숫자.
     * 실기기 테스트 뒤에 로그를 전부 뒤질 필요 없이 마지막 요약만 보면 된다.
     */
    const voiceStats = {
      turns: 0,
      calls: 0,
      callErrors: 0,
      spokeKorean: 0,
      spokeNotation: 0,
      spokePrompt: 0,
    };

    ctx.addShutdownCallback(async () => {
      clearTimeout(hardStop);
      await koreanVoice?.close().catch(() => undefined);
      if (toolVoice) {
        const s = voiceStats;
        log(
          `요약 — 선생님 발화 ${s.turns} · ${SAY_KOREAN} 호출 ${s.calls}` +
            (s.callErrors ? ` (실패 ${s.callErrors})` : '') +
            ` · 한국어 직접 발음 ${s.spokeKorean} · 도구 표기를 소리 냄 ${s.spokeNotation}` +
            ` · 프롬프트를 읽음 ${s.spokePrompt}`,
        );
      }
      log('종료');
    });

    /**
     * 진단. 소리는 이미 나갔으니 막을 순 없지만, **무엇이 얼마나** 일어나는지
     * 알아야 다음 손을 정할 수 있다.
     *
     *  · 도구로 낸 한국어는 채팅 문맥에 안 들어간다(addToChatCtx: false). 그래서
     *    선생님 자막에 한글이 있으면 = 모델이 자기 목소리로 한국어를 말한 것.
     *  · 자막에 도구 이름이나 "invoke" 가 있으면 = 호출하지 않고 **표기를 읽은 것**
     *    (실기기에서 실제로 "→ say_korean(…)" 이 자막에 찍혔다).
     *  · 도구 실행 결과는 FunctionToolsExecuted 로 본다. 인자 검증에 걸리거나
     *    없는 이름을 부르면 execute 까지 안 와서 `say_korean: …` 로그가 없다 —
     *    그 경우가 여기서만 보인다.
     */
    if (toolVoice) {
      log(`도구 등록: ${SAY_KOREAN} (BLOCKING)`);

      session.on(voice.AgentSessionEventTypes.ConversationItemAdded, (ev) => {
        const item = ev.item;
        if (!(item instanceof llm.ChatMessage) || item.role !== 'assistant') return;
        const text = item.textContent ?? '';
        if (!text.trim()) return;
        voiceStats.turns += 1;
        if (SPOKEN_PROMPT_LEAK.test(text)) {
          voiceStats.spokePrompt += 1;
          log(`⚠️ 선생님이 프롬프트 예시를 대사로 읽었다: "${text.slice(0, 200)}"`);
        }
        if (SPOKEN_TOOL_NOTATION.test(text)) {
          voiceStats.spokeNotation += 1;
          log(`⚠️ 도구를 부르지 않고 도구 표기를 소리 냈다: "${text.slice(0, 200)}"`);
        } else if (containsSpokenKorean(text)) {
          voiceStats.spokeKorean += 1;
          log(`⚠️ 선생님이 한국어를 직접 발음했다: "${text.slice(0, 200)}"`);
        }
      });

      session.on(voice.AgentSessionEventTypes.FunctionToolsExecuted, (ev) => {
        ev.functionCalls.forEach((call, i) => {
          voiceStats.calls += 1;
          const out = ev.functionCallOutputs[i];
          if (call.name !== SAY_KOREAN || out?.isError) {
            voiceStats.callErrors += 1;
            log(
              `⚠️ 도구 호출 실패: ${call.name}(${call.args.slice(0, 160)}) → ` +
                `${out ? out.output.slice(0, 200) : '결과 없음'}`,
            );
          }
        });
      });
    }

    await session.start({
      agent: new voice.Agent({
        instructions: meta.instructions,
        ...(koreanVoice ? { tools: koreanVoice.tools } : {}),
      }),
      room: ctx.room,
      inputOptions: {
        // 학습자가 나가면 세션을 닫는다. 빈 방에 Gemini 를 붙들고 있지 않는다
        closeOnDisconnect: true,
      },
      outputOptions: {
        // 자막을 lk.transcription text stream 으로 앱에 보낸다.
        // 앱의 caption / userSaid / 종료 분석이 전부 여기에 매달려 있다
        transcriptionEnabled: true,
        // 글자가 소리보다 앞서 달리지 않게 오디오와 맞춰 내보낸다
        syncTranscription: true,
      },
    });

    /**
     * 선생님이 먼저 인사한다.
     *
     * 학습자가 먼저 말하기를 기다리면 "연결은 됐는데 아무 말도 안 하는"
     * 화면이 된다 — 회화가 무서운 사람에게 그 몇 초가 제일 크다.
     * 무슨 말로 인사할지는 master prompt 가 이미 정해놨다.
     *
     * ⚠️ instructions 를 **반드시** 넘긴다. 안 넘기면 빈 turn 이 나가서
     *    Gemini 가 아무 말도 안 한다 (config.ts 의 OPENING_DIRECTIVE 주석 참고).
     */
    const greet = async (why: string): Promise<boolean> => {
      try {
        await session
          .generateReply({
            // tool 모드: 첫 행동을 say_korean 호출로 — 첫 한국어가 세션 끝까지 간다
            // (config.ts 의 OPENING_DIRECTIVE_TOOL_FIRST_CALL 주석)
            instructions: toolVoice ? OPENING_DIRECTIVE_TOOL_FIRST_CALL : OPENING_DIRECTIVE,
          })
          .waitForPlayout();
        log(`첫 인사 완료 (${why})`);
        return true;
      } catch (e) {
        log(`첫 인사 실패 (${why}): ${e instanceof Error ? e.message : String(e)}`);
        return false;
      }
    };

    // 한 번 더 기회를 준다. 인사가 빠진 통화는 "고장난 통화" 로 보이고,
    // 학습자는 뭘 해야 하는지 모른 채 몇 초를 버린다 — 재시도가 훨씬 싸다.
    if (!(await greet('첫 시도'))) {
      await greet('재시도');
    }
  },
});

// `cli.runApp` 이 이 파일을 다시 import 해서 default export 를 집어간다.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cli.runApp(
    new ServerOptions({
      agent: fileURLToPath(import.meta.url),
      // ⚠️ explicit dispatch 의 키. API 의 LIVEKIT_TUTOR_AGENT_NAME 과
      //    글자 하나까지 같아야 한다. 다르면 dispatch 는 성공하는데 아무도
      //    방에 안 들어온다 — 제일 진단하기 어려운 실패다
      agentName: AGENT_NAME,
    }),
  );
}
