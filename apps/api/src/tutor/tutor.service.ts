import {
  Injectable,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  UserMistake,
  UserMistakeDocument,
} from '../users/schemas/user-mistake.schema';
import {
  buildTutorInstructions,
  type LearnerContext,
} from './prompt/build-instructions';
import {
  EST_COST_PER_MIN_USD,
  IS_PREMIUM_MODEL,
  MAX_RESPONSE_TOKENS,
  MAX_SESSION_MINUTES,
  RECENT_SESSIONS_FOR_CONTEXT,
  TRANSCRIBE_MODEL,
  TUTOR_MODEL,
  resolveVoice,
  type MistakeType,
  type RolePlayScene,
  type TutorMode,
} from './tutor.const';
import { TutorUsageService } from './tutor-usage.service';
import {
  TutorAnalysisService,
  type SessionSummary,
  type TranscriptTurn,
} from './tutor-analysis.service';
import { TOPIC_BY_ID } from './topics/tutor-topics';
import { resolveTeacher, type TutorTeacher } from './teachers/tutor-teachers';
import {
  TutorSession,
  TutorSessionDocument,
} from './schemas/tutor-session.schema';

const OPENAI_API = 'https://api.openai.com/v1';

@Injectable()
export class TutorService implements OnModuleInit {
  private readonly logger = new Logger(TutorService.name);

  onModuleInit() {
    const line = `AI 튜터 모델: ${TUTOR_MODEL} (분당 약 $${EST_COST_PER_MIN_USD})`;
    if (IS_PREMIUM_MODEL) {
      // 실험용으로 올렸다가 그대로 배포되는 사고를 막는다
      this.logger.warn(
        `⚠️ ${line} — 정가 모델이다. mini 대비 3배 가량 비싸다. ` +
          `배포 전에 OPENAI_REALTIME_MODEL 을 확인할 것.`,
      );
    } else {
      this.logger.log(line);
    }
  }

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(UserMistake.name)
    private readonly mistakeModel: Model<UserMistakeDocument>,
    @InjectModel(TutorSession.name)
    private readonly sessionModel: Model<TutorSessionDocument>,
    private readonly usage: TutorUsageService,
    private readonly analysis: TutorAnalysisService,
  ) {}

  /**
   * WebRTC 연결용 임시 토큰을 발급한다.
   *
   * ⚠️ OPENAI_API_KEY 는 이 함수 밖으로 절대 나가지 않는다. 앱에는 여기서
   * 만든 단명 토큰(ephemeral)만 준다. 앱에 정식 키를 넣으면 누구든 우리
   * 계정으로 무한히 호출할 수 있다.
   *
   * 쿼터 검사를 발급 **직전에** 한다. UI 에서 막는 건 우회되지만 여기는 못 
   * 지나간다.
   */
  async createSession(
    userId: string,
    mode: TutorMode,
    lang: string,
    scene?: RolePlayScene,
    voice?: string,
    topicId?: string,
    teacherId?: string,
  ) {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      throw new ServiceUnavailableException('TUTOR_NOT_CONFIGURED');
    }

    const quota = await this.usage.assertCanStart(userId);
    const learner = await this.buildLearnerContext(userId, lang);
    const topic = topicId ? TOPIC_BY_ID.get(topicId) : undefined;
    const teacher = resolveTeacher(teacherId);
    const instructions = buildTutorInstructions(
      learner,
      mode,
      scene,
      topic,
      teacher,
    );

    const res = await fetch(`${OPENAI_API}/realtime/client_secrets`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        // 남용 추적용. 유저 식별자를 그대로 넘기지 않도록 해시로 준다
        'OpenAI-Safety-Identifier': hashId(userId),
      },
      body: JSON.stringify({
        session: {
          type: 'realtime',
          model: TUTOR_MODEL,
          instructions,
          audio: {
            input: {
              /**
               * 사용자 발화 자막.
               *
               * ⚠️ whisper-1 은 언어 힌트가 없으면 짧은 발화에서 언어를 잘못
               * 찍는다. 우즈벡어로 "Men kecha kinoga bordim" 이라고 하면
               * 터키어나 키릴로 옮겨 적어서 화면에 엉뚱한 글자가 떴다.
               *
               * language 를 하나로 고정하면 code-switching 이 깨진다
               * ("오늘 친구랑 kinoga bordim" 같은 문장이 이 앱의 일상이다).
               * 그래서 언어를 고정하지 않고 **무엇이 섞여 오는지** 를 프롬프트로
               * 알려준다. gpt-4o-transcribe 는 이 힌트를 실제로 반영한다.
               */
              transcription: {
                model: TRANSCRIBE_MODEL,
                prompt:
                  'The speaker is an Uzbek learner of Korean. ' +
                  'They mix Korean (한국어) and Uzbek (o\'zbekcha) freely, ' +
                  'sometimes in the same sentence. ' +
                  'Write Korean in Hangul and Uzbek in the Latin alphabet. ' +
                  'Never translate; transcribe what was actually said.',
              },
              // semantic_vad: 말이 끊긴 게 아니라 "생각 중"인 걸 구분한다.
              // server_vad 는 침묵 길이만 보기 때문에 학습자가 단어를 떠올리는
              // 사이에 AI 가 끼어든다 — 회화 연습에서 제일 거슬리는 부분이다.
              turn_detection: {
                type: 'semantic_vad',
                eagerness: 'low',
                // 유저가 말을 시작하면 AI 응답을 즉시 끊는다 (barge-in)
                interrupt_response: true,
              },
            },
            /**
             * 목소리는 **선생님이 정한다.** 유저가 카드에서 고른 사람과 소리가
             * 따로 놀면 고른 의미가 없다.
             *
             * ⚠️ 세션이 시작된 뒤에는 목소리를 못 바꾼다. 여기서 확정된다.
             */
            output: {
              voice: resolveVoice(teacher.realtimeVoice),
              // 선생님마다 말속도가 다르다 (초급 대상은 조금 느리게)
              speed: teacher.speechRate,
            },
          },
          /**
           * 출력은 **오디오**. 모델이 직접 말한다.
           *
           * 한동안 텍스트만 받아서 Azure TTS 로 읽혔다(하이브리드). 한국어 발음은
           * 그쪽이 정확했지만 대가가 컸다:
           *
           *   · TTS 는 글자를 읽는 기계다. 웃지도, 톤을 바꾸지도, 타이밍을 잡지도
           *     못한다. 농담을 아무리 잘 써도 뉴스 앵커가 읽는다 — 애드립이 죽는다.
           *   · 언어마다 음성이 달라서 한 문장 안에서 목소리가 바뀌었다.
           *     ("Tushundingizmi? 그럼 한번 해봐요" 가 두 사람 목소리로 나온다)
           *
           * 회화 튜터에서 재미와 사람 같은 느낌이 발음 정확도보다 중요하다는
           * 판단이다. 발음 예문처럼 **정확히 들려줘야 하는 자리**는 여전히
           * Azure TTS(`POST /tutor/tts`)로 낼 수 있게 남겨뒀다.
           *
           * ⚠️ 원가: 출력 오디오는 입력의 2배 단가다. 텍스트만 받던 때보다
           *    분당 비용이 오른다 (tutor.const.ts 의 EST_COST_PER_MIN_USD).
           */
          output_modalities: ['audio'],
          // 출력 오디오가 입력의 2배 단가다. 프롬프트로만 "짧게"를 부탁하면
          // 가끔 길게 뱉으므로 여기서 상한을 건다.
          max_output_tokens: MAX_RESPONSE_TOKENS,
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      // 응답 본문에 키 관련 정보가 실릴 수 있어 로그에만 남긴다
      this.logger.error(
        `Realtime 세션 발급 실패 ${res.status}: ${text.slice(0, 300)}`,
      );
      throw new ServiceUnavailableException('TUTOR_SESSION_FAILED');
    }

    const data = (await res.json()) as { value?: string; expires_at?: number };
    if (!data.value) {
      this.logger.error('Realtime 응답에 토큰이 없다');
      throw new ServiceUnavailableException('TUTOR_SESSION_FAILED');
    }

    const session = await this.usage.open(
      userId,
      mode,
      scene,
      topic?.id,
      teacher,
    );

    return {
      sessionId: session._id.toString(),
      clientSecret: data.value,
      expiresAt: data.expires_at ?? null,
      model: TUTOR_MODEL,
      // 실제로 쓰인 목소리. 앱이 요청한 voice 가 아니라 **선생님이 정한** 것이다 —
      // 유저가 고른 사람과 소리가 따로 놀면 안 된다 (요청값은 무시된다)
      voice: resolveVoice(teacher.realtimeVoice),
      teacher: {
        id: teacher.id,
        name: teacher.name,
        avatar: teacher.avatar,
        color: teacher.color,
        speechRate: teacher.speechRate,
      },
      topicId: topic?.id ?? null,
      /** 화면에 "오늘 배울 표현"으로 미리 보여준다 */
      targetExpressions: topic?.targetExpressions ?? [],
      // 앱이 이 시간이 되면 스스로 끊는다. 서버 쿼터와 별개로 한 세션이
      // 무한정 이어지지 않게 하는 두 번째 방어선.
      maxDurationSec: Math.min(quota.allowedMin, MAX_SESSION_MINUTES) * 60,
      quota,
    };
  }

  /**
   * 세션 종료 보고.
   *
   * 순서가 중요하다. **쿼터 정산을 먼저 끝내고** 나서 요약을 시도한다.
   * 요약은 부가 기능인데 이게 실패해서 사용 시간이 기록 안 되면, 유저는
   * 쓰고도 안 깎이는 걸 알게 되고 그 순간 원가 통제가 무너진다.
   */
  async endSession(
    userId: string,
    sessionId: string,
    durationSec: number,
    lang = 'uz',
    transcript?: TranscriptTurn[],
  ) {
    const closed = await this.usage.close(userId, sessionId, durationSec);
    const quota = await this.usage.getQuota(userId);

    let summary: SessionSummary | null = null;
    if (closed && transcript?.length) {
      summary = await this.analysis
        .analyze(closed, transcript, lang)
        .catch((e) => {
          this.logger.warn(`세션 분석 실패: ${e?.message ?? e}`);
          return null;
        });
    }

    return {
      success: !!closed,
      durationSec: closed?.durationSec ?? 0,
      quota,
      summary,
    };
  }

  getQuota(userId: string) {
    return this.usage.getQuota(userId);
  }

  /**
   * 개인화 재료를 모은다.
   *
   * 세 군데서 읽는다 — 유저 프로필, 레슨 오답 장부(UserMistake), 지난 대화
   * 기록(TutorSession). 별도의 tutorProfile 컬렉션은 만들지 않았다. 세션
   * 문서에 이미 다 있어서, 프로필을 따로 두면 두 곳을 동기화하는 문제만 는다.
   */
  private async buildLearnerContext(
    userId: string,
    lang: string,
  ): Promise<LearnerContext> {
    const user = await this.userModel
      .findById(userId)
      .select('level nickname interests')
      .lean();

    // 아직 해소되지 않은 오답 중 최근에 틀린 것들의 태그를 약점으로 본다
    const mistakes = await this.mistakeModel
      .find({ userId: new Types.ObjectId(userId), resolvedAt: null })
      .sort({ lastWrongAt: -1 })
      .limit(30)
      .populate<{ questionId: { tags?: string[]; answer?: string } }>(
        'questionId',
        'tags answer',
      )
      .lean();

    const tagCount = new Map<string, number>();
    for (const m of mistakes) {
      for (const tag of (m.questionId as any)?.tags ?? []) {
        tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
      }
    }
    const weakPoints = [...tagCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([tag]) => tag);

    const past = await this.recentSessionContext(userId);

    return {
      koreanLevel: (user?.level as LearnerContext['koreanLevel']) ?? 'beginner',
      // targetLanguage 는 "배우는 언어"(korean)라 모국어가 아니다.
      // 앱이 지금 쓰는 UI 언어를 모국어로 본다 — 다른 API 들과 같은 규칙.
      nativeLanguage: lang,
      weakPoints,
      recentVocabulary: past.recentVocabulary,
      interests: ((user?.interests ?? []) as string[]).slice(0, 5),
      nickname: user?.nickname,
      spokenMistakes: past.spokenMistakes,
      mistakeHabits: past.mistakeHabits,
      lastSession: past.lastSession,
    };
  }

  /**
   * 지난 대화들에서 다음 세션에 쓸 것만 뽑는다.
   *
   * 최신 것을 우선한다 — 3주 전에 틀린 걸 다시 파는 것보다 어제 틀린 게 낫다.
   * 그래서 정렬 순서를 그대로 살려서 앞에서부터 채운다.
   */
  private async recentSessionContext(userId: string) {
    const sessions = await this.sessionModel
      .find({
        userId: new Types.ObjectId(userId),
        analyzed: true,
        summary: { $ne: null },
      })
      .sort({ startedAt: -1 })
      .limit(RECENT_SESSIONS_FOR_CONTEXT)
      .select('topic startedAt mistakes newVocabulary')
      .lean();

    if (!sessions.length) return { recentVocabulary: [] as string[] };

    const vocab: string[] = [];
    const seenVocab = new Set<string>();
    const spokenMistakes: { corrected: string; type: MistakeType }[] = [];
    const seenMistake = new Set<string>();
    const habit = new Map<MistakeType, number>();

    for (const s of sessions) {
      for (const w of s.newVocabulary ?? []) {
        if (!seenVocab.has(w)) {
          seenVocab.add(w);
          vocab.push(w);
        }
      }
      for (const m of s.mistakes ?? []) {
        habit.set(m.type, (habit.get(m.type) ?? 0) + 1);
        if (!seenMistake.has(m.corrected)) {
          seenMistake.add(m.corrected);
          spokenMistakes.push({ corrected: m.corrected, type: m.type });
        }
      }
    }

    const last = sessions[0];
    const daysAgo = Math.max(
      0,
      Math.floor(
        (Date.now() - new Date(last.startedAt).getTime()) / 86400000,
      ),
    );
    const topic = last.topic ? TOPIC_BY_ID.get(last.topic) : undefined;

    return {
      recentVocabulary: vocab.slice(0, 12),
      spokenMistakes: spokenMistakes.slice(0, 4),
      // 한 번 틀린 건 습관이 아니다. 두 번 이상 나온 갈래만 본다
      mistakeHabits: [...habit.entries()]
        .filter(([, n]) => n >= 2)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([t]) => t),
      lastSession: { topicTitle: topic?.title.en, daysAgo },
    };
  }
}

/** 유저 식별자를 그대로 외부에 넘기지 않기 위한 단방향 해시 */
function hashId(userId: string): string {
  return crypto.createHash('sha256').update(userId).digest('hex').slice(0, 32);
}
