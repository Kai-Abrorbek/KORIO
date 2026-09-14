import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserLeague } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { EnergyService } from '../energy/energy.service';
import { LessonsService } from '../lessons/lessons.service';
import { StudyCategory } from '../users/utils/study-category.util';
import { startOfDay } from '../common/date.util';
import {
  CHALLENGE_COOLDOWN_SEC,
  CHALLENGE_DAILY_LIMIT,
  CHALLENGE_MAX_SCORE,
  LeagueChallengeConfig,
  challengeFor,
} from './league-challenge.const';

/**
 * 리그 주간 챌린지.
 *
 * ⚠️ 이 모듈이 league/ 가 아니라 따로 있는 이유: XP 지급에 LessonsService 가
 * 필요한데 LessonsModule 이 이미 LeagueModule 을 import 한다. LeagueModule 에서
 * 거꾸로 가져오면 순환이 된다. 여기는 아무도 import 하지 않는 잎 모듈이라
 * 양쪽을 다 쓸 수 있다.
 */
@Injectable()
export class ChallengeService {
  private readonly logger = new Logger(ChallengeService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly usersService: UsersService,
    private readonly energyService: EnergyService,
    private readonly lessonsService: LessonsService,
  ) {}

  /** 이번 주 내 리그의 종목. 앱은 이 id 로 어떤 게임을 열지만 정한다 */
  async getChallenge(userId: string) {
    const { tier, config, claimsToday, lastAt } = await this.load(userId);
    const now = Date.now();
    const cooldownLeft = lastAt
      ? Math.max(
          0,
          Math.ceil((CHALLENGE_COOLDOWN_SEC * 1000 - (now - lastAt.getTime())) / 1000),
        )
      : 0;
    return {
      tier,
      id: config.id,
      maxXp: config.maxXp,
      energyCost: config.energyCost,
      playsToday: claimsToday.length,
      playsLeftToday: Math.max(0, CHALLENGE_DAILY_LIMIT - claimsToday.length),
      cooldownSeconds: cooldownLeft,
    };
  }

  /**
   * 시작 — 에너지를 깎는다.
   *
   * 에너지 차감을 앱에 두지 않는 이유: 안 깎고 게임만 여는 건 앱 코드 한 줄이다.
   * 여기서 깎고, 앱은 응답으로 현재 에너지를 받아 화면만 맞춘다.
   */
  async startChallenge(userId: string) {
    const { config } = await this.load(userId);
    const energy = await this.energyService.consume(userId, config.energyCost);
    return { id: config.id, energyCost: config.energyCost, energy };
  }

  /**
   * 완료 — 점수를 XP 로 바꾼다.
   *
   * 점수는 앱이 신고한다(게임 로직이 앱에 있다). 그래서 **금액이 아니라 빈도**를
   * 막는다 — 한 판 상한(maxXp) + 쿨다운 + 하루 횟수. 콤보 보너스와 같은 방식이다.
   * 못 주는 건 에러가 아니다: 앱은 XP 0 을 받고 연출만 생략하면 된다.
   */
  async completeChallenge(userId: string, rawScore: number) {
    const { tier, config, claimsToday, lastAt, todayStart } =
      await this.load(userId);

    const score = Math.max(0, Math.min(CHALLENGE_MAX_SCORE, Math.trunc(rawScore || 0)));
    const now = new Date();

    const onCooldown =
      !!lastAt && now.getTime() - lastAt.getTime() < CHALLENGE_COOLDOWN_SEC * 1000;
    const overDaily = claimsToday.length >= CHALLENGE_DAILY_LIMIT;

    if (onCooldown || overDaily) {
      this.logger.log(
        `챌린지 XP 거절: user=${userId} tier=${tier} ` +
          `${onCooldown ? '쿨다운' : '하루한도'} score=${score}`,
      );
      return this.result(tier, config, score, 0, claimsToday.length, false);
    }

    const xp = Math.min(config.maxXp, Math.floor(score * config.xpPerPoint));

    // 요청이 겹쳐 들어와도 한도를 못 넘도록 조건을 여기 한 번 더 건다.
    // (콤보 보너스와 같은 패턴 — 앱이 두 번 부르는 건 흔하다)
    const todayOnly = {
      $filter: {
        input: { $ifNull: ['$leagueChallengeClaims', []] },
        cond: { $gte: ['$$this', todayStart] },
      },
    };
    const claimed = await this.userModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(userId),
        $expr: { $lt: [{ $size: todayOnly }, CHALLENGE_DAILY_LIMIT] },
      },
      [{ $set: { leagueChallengeClaims: { $concatArrays: [todayOnly, [now]] } } }],
      { returnDocument: 'after' },
    );
    if (!claimed) {
      return this.result(tier, config, score, 0, claimsToday.length, false);
    }

    // 통계는 XP 가 0 이어도 남긴다 — 플레이는 했다.
    // 게임은 문제 개념이 없으므로 questionCount + overrideCategory 로 넣는다
    // (읽기 연습이 쓰는 것과 같은 경로).
    await this.lessonsService
      .recordStudy(userId, {
        questionCount: Math.max(1, Math.min(score, 60)),
        wrongCount: 0,
        overrideCategory: StudyCategory.VOCAB,
      })
      .catch(() => undefined);

    if (xp > 0) {
      // XP·totalXP·리그는 addXp 가 처리한다 (다른 모드와 같은 경로)
      await this.lessonsService.addXp(userId, xp);
      await this.usersService.syncStreak(userId).catch(() => undefined);
    }

    this.logger.log(
      `챌린지 완료: user=${userId} tier=${tier} game=${config.id} ` +
        `score=${score} xp=${xp} 오늘=${claimsToday.length + 1}/${CHALLENGE_DAILY_LIMIT}`,
    );
    return this.result(tier, config, score, xp, claimsToday.length + 1, true);
  }

  // ── 내부 ──────────────────────────────────────────────

  private result(
    tier: UserLeague,
    config: LeagueChallengeConfig,
    score: number,
    xpEarned: number,
    playsToday: number,
    counted: boolean,
  ) {
    return {
      tier,
      id: config.id,
      score,
      xpEarned,
      maxXp: config.maxXp,
      playsToday,
      playsLeftToday: Math.max(0, CHALLENGE_DAILY_LIMIT - playsToday),
      /** false 면 쿨다운·하루 한도에 걸려 XP 가 안 나갔다는 뜻 */
      counted,
    };
  }

  private async load(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('league timezone leagueChallengeClaims')
      .lean();
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const tier = user.league ?? UserLeague.BRONZE;
    const todayStart = startOfDay(new Date(), user.timezone);
    const claims = (user.leagueChallengeClaims ?? []).map((at) => new Date(at));
    const claimsToday = claims.filter((at) => at >= todayStart);
    const lastAt = claims.length
      ? claims.reduce((a, b) => (a > b ? a : b))
      : null;

    return { tier, config: challengeFor(tier), claimsToday, lastAt, todayStart };
  }
}
