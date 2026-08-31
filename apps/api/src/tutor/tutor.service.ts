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
  TUTOR_MODEL,
  resolveVoice,
  type RolePlayScene,
  type TutorMode,
} from './tutor.const';
import { TutorUsageService } from './tutor-usage.service';
import { TOPIC_BY_ID } from './topics/tutor-topics';

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
    private readonly usage: TutorUsageService,
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
  ) {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      throw new ServiceUnavailableException('TUTOR_NOT_CONFIGURED');
    }

    const quota = await this.usage.assertCanStart(userId);
    const learner = await this.buildLearnerContext(userId, lang);
    const topic = topicId ? TOPIC_BY_ID.get(topicId) : undefined;
    const instructions = buildTutorInstructions(learner, mode, scene, topic);

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
              // 사용자 발화 자막용. Phase 2 에서 화면에 뿌린다
              transcription: { model: 'whisper-1' },
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
            output: {
              voice: resolveVoice(voice),
              // 초급자에겐 조금 천천히. 알아듣는 게 먼저다
              speed: learner.koreanLevel === 'beginner' ? 0.9 : 1,
            },
          },
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

    const session = await this.usage.open(userId, mode, scene, topic?.id);

    return {
      sessionId: session._id.toString(),
      clientSecret: data.value,
      expiresAt: data.expires_at ?? null,
      model: TUTOR_MODEL,
      voice: resolveVoice(voice),
      topicId: topic?.id ?? null,
      /** 화면에 "오늘 배울 표현"으로 미리 보여준다 */
      targetExpressions: topic?.targetExpressions ?? [],
      // 앱이 이 시간이 되면 스스로 끊는다. 서버 쿼터와 별개로 한 세션이
      // 무한정 이어지지 않게 하는 두 번째 방어선.
      maxDurationSec: Math.min(quota.allowedMin, MAX_SESSION_MINUTES) * 60,
      quota,
    };
  }

  /** 세션 종료 보고 */
  async endSession(userId: string, sessionId: string, durationSec: number) {
    const closed = await this.usage.close(userId, sessionId, durationSec);
    const quota = await this.usage.getQuota(userId);
    return {
      success: !!closed,
      durationSec: closed?.durationSec ?? 0,
      quota,
    };
  }

  getQuota(userId: string) {
    return this.usage.getQuota(userId);
  }

  /**
   * 개인화 재료를 모은다.
   *
   * 새 컬렉션을 만들지 않고 이미 쌓여 있는 걸 읽는다 — 오답 장부(UserMistake)와
   * 유저 프로필. 스펙의 tutorProfile 컬렉션은 Phase 3 에서 세션 분석 결과가
   * 생길 때 만드는 게 맞다. 지금 만들면 채울 게 없는 빈 껍데기가 된다.
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

    return {
      koreanLevel: (user?.level as LearnerContext['koreanLevel']) ?? 'beginner',
      // targetLanguage 는 "배우는 언어"(korean)라 모국어가 아니다.
      // 앱이 지금 쓰는 UI 언어를 모국어로 본다 — 다른 API 들과 같은 규칙.
      nativeLanguage: lang,
      weakPoints,
      recentVocabulary: [],
      interests: ((user?.interests ?? []) as string[]).slice(0, 5),
      nickname: user?.nickname,
    };
  }
}

/** 유저 식별자를 그대로 외부에 넘기지 않기 위한 단방향 해시 */
function hashId(userId: string): string {
  return crypto.createHash('sha256').update(userId).digest('hex').slice(0, 32);
}
