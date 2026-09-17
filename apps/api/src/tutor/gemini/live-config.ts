import { buildTutorInstructions, type LearnerContext } from '../prompt/build-instructions';
import type { TutorTeacher } from '../teachers/tutor-teachers';
import type { TutorTopic } from '../topics/tutor-topics';
import type { RolePlayScene, TutorMode } from '../tutor.const';
import { GEMINI_LIVE_MODEL_PATH } from './live.const';

/**
 * Gemini Live 세션 설정을 만든다.
 *
 * SDK 의 `LiveConnectConfig` 와 같은 모양이다. 일부러 SDK 타입을 import 하지
 * 않았다 — 이 파일은 **설정을 정하는 곳**이고, 그걸 어디로 보내느냐(ephemeral
 * token 제약 / 직접 connect)는 부르는 쪽 사정이다. 의존을 끊어 두면 전송
 * 방식이 바뀌어도 이 파일은 안 바뀐다.
 */
export interface GeminiLiveConfig {
  responseModalities: ['AUDIO'];
  systemInstruction: string;
  speechConfig: {
    voiceConfig: { prebuiltVoiceConfig: { voiceName: string } };
    languageCode?: string;
  };
  /** 학습자 발화 자막 */
  inputAudioTranscription: Record<string, never>;
  /** 튜터 발화 자막 */
  outputAudioTranscription: Record<string, never>;
  contextWindowCompression: { slidingWindow: Record<string, never> };
  sessionResumption: Record<string, never>;
}

export interface BuildLiveConfigArgs {
  learner: LearnerContext;
  mode: TutorMode;
  teacher: TutorTeacher;
  /** Gemini prebuilt voice 이름. 선생님이 정한다 */
  voiceName: string;
  scene?: RolePlayScene;
  topic?: TutorTopic;
}

export function buildGeminiLiveConfig({
  learner,
  mode,
  teacher,
  voiceName,
  scene,
  topic,
}: BuildLiveConfigArgs): GeminiLiveConfig {
  return {
    responseModalities: ['AUDIO'],
    systemInstruction: buildTutorInstructions(
      learner,
      mode,
      scene,
      topic,
      teacher,
    ),
    speechConfig: {
      voiceConfig: { prebuiltVoiceConfig: { voiceName } },
      /**
       * ⚠️ languageCode 를 **일부러 안 넣는다.**
       *
       * 이 튜터는 한 문장 안에서 언어를 갈아탄다
       * ("Qani, qaytarib ko'ring — 공항에 갔어요"). 언어를 하나로 못 박으면
       * 그 규칙(프롬프트 §2)이 소리에서 깨진다 — 우즈벡어를 한국어 규칙으로
       * 읽거나 그 반대가 된다. 모델이 알아서 갈아타게 둔다.
       */
    },
    // 자막은 **화면과 기록용**이다. 여기서 받은 글자를 다시 TTS 로 읽히지 않는다 —
    // 소리는 이미 모델이 직접 냈다
    inputAudioTranscription: {},
    outputAudioTranscription: {},
    /**
     * 긴 대화에서 문맥이 한도를 넘으면 세션이 그냥 끊긴다.
     * 오래된 turn 부터 밀어내서 대화를 살려 둔다.
     */
    contextWindowCompression: { slidingWindow: {} },
    // 10분쯤에 WebSocket 이 한 번 끊길 수 있다. 재개 핸들 없이 나가면
    // 그 순간 대화가 통째로 날아간다
    sessionResumption: {},
  };

  /**
   * ⚠️ 여기 **넣으면 안 되는 것들** (3.8 Live 에서 달라진 부분):
   *
   *   thinkingConfig / thinkingLevel
   *     3.8 Live 는 MINIMAL 고정이다. 넣으면 거절당한다. 깊은 추론이 필요하면
   *     extended-thinking 변종을 써야 하는데, 회화 튜터에서 중요한 건 추론
   *     깊이가 아니라 **첫 소리가 언제 나오느냐**다. 쓰지 않는다.
   *
   *   enableAffectiveDialog
   *     3.8 Live 에는 이 노브가 없다. 감정 반응은 기본 동작이다.
   *
   *   proactivity: { proactiveAudio: false }
   *     항상 켜져 있다. 끄면 안 된다 — 이게 "학습자가 단어를 떠올리는 동안
   *     끼어들지 않는" 동작이고, 예전 모델에서 semantic_vad 로 흉내 내던 것이다.
   *
   *   tools (search grounding 등)
   *     지연과 비용만 는다. 한국어 회화 연습에 검색이 왜 필요한가.
   */
}

/** ephemeral token 에 박아 넣을 제약 */
export function liveConnectConstraints(config: GeminiLiveConfig) {
  return { model: GEMINI_LIVE_MODEL_PATH, config };
}
