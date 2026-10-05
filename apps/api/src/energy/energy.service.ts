import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  ENERGY_CONFIG,
  COMBO_BONUS_DAILY_LIMIT,
  COMBO_BONUS_THRESHOLD,
} from './energy.constants';
import {
  claimsSince,
  computeEnergy,
  decideComboBonus,
  minutesToFull,
} from './energy.util';
import { isSuperActive } from '../users/super.util';
import { startOfDay } from '../common/date.util';

@Injectable()
export class EnergyService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // ─────────────────────────── 조회 ───────────────────────────

  /** 현재 상태. 흐른 시간만큼 회복시켜서 저장까지 한다 */
  async getState(userId: string) {
    const user = await this.mustFind(userId);
    await this.applyRegen(user);
    return this.buildResponse(user);
  }

  /**
   * 에너지를 쓰는 학습을 **시작**해도 되는가. 0 이면 막는다 (SUPER 는 항상 통과).
   *
   * 예전엔 앱 화면만 막았다(guardLessonStart). 서버는 완료 때 0 밑으로 안 내려가게만
   * 깎아서, 앱을 거치지 않거나 화면 값이 어긋나 있으면 에너지 0 으로 계속 풀 수 있었다.
   */
  async assertCanStart(userId: string): Promise<void> {
    const user = await this.mustFind(userId);
    await this.applyRegen(user);
    if (isSuperActive(user)) return;
    if ((user.energy ?? 0) <= 0) {
      throw new ForbiddenException('ENERGY_EMPTY');
    }
  }

  // ─────────────────────────── 충전 ───────────────────────────

  /**
   * 보석으로 가득 채우기.
   *
   * 조건 검사와 차감을 한 번의 findOneAndUpdate 로 묶는다. 따로 읽고 쓰면
   * 요청 두 개가 겹칠 때 둘 다 "보석 충분" 을 보고 통과해서, 350 짜리를
   * 두 번 사고 보석이 음수로 내려간다.
   */
  /**
   * 보석으로 에너지를 가득 채운다.
   *
   * ⚠️ 예전엔 보석 잔액만 보고 무조건 깎았다. 그래서 두 가지로 보석이 증발했다.
   *   · 에너지가 이미 25/25 인데 눌러도 350 이 나갔다 (산 게 없다)
   *   · SUPER 유저는 consume 이 그냥 돌아와서 에너지를 아예 안 쓰는데,
   *     그런 유저도 충전을 살 수 있었다 (100% 낭비)
   * 화면에서 버튼을 감추는 것만으로는 부족하다 — 서버가 막아야 한다.
   */
  async refill(userId: string) {
    const user = await this.mustFind(userId);
    // 회복분을 먼저 확정해야 "이미 가득" 판정이 맞다
    await this.applyRegen(user);

    if (isSuperActive(user)) {
      throw new BadRequestException('ENERGY_SUPER_UNLIMITED');
    }
    if ((user.energy ?? 0) >= ENERGY_CONFIG.MAX) {
      throw new BadRequestException('ENERGY_ALREADY_FULL');
    }

    const updated = await this.userModel.findOneAndUpdate(
      {
        _id: user._id,
        gems: { $gte: ENERGY_CONFIG.REFILL_GEM_COST },
        // 조건을 여기 한 번 더 건다 — 버튼을 빠르게 두 번 누르면 위 검사를
        // 둘 다 통과한 뒤 두 번 깎일 수 있다
        energy: { $lt: ENERGY_CONFIG.MAX },
      },
      {
        $inc: { gems: -ENERGY_CONFIG.REFILL_GEM_COST },
        $set: { energy: ENERGY_CONFIG.MAX, energyUpdatedAt: new Date() },
      },
      { returnDocument: 'after' },
    );

    if (!updated) {
      // 겹친 요청이 먼저 채웠으면 이미 가득이다 — 보석은 안 나갔다
      const fresh = await this.userModel
        .findById(user._id)
        .select('energy gems')
        .lean();
      if (!fresh) throw new NotFoundException('USER_NOT_FOUND');
      if ((fresh.energy ?? 0) >= ENERGY_CONFIG.MAX) {
        throw new BadRequestException('ENERGY_ALREADY_FULL');
      }
      throw new BadRequestException('NOT_ENOUGH_GEMS');
    }
    return this.buildResponse(updated);
  }

  /**
   * 무료 +5 (하루 3회).
   *
   * 횟수 검사도 조건절로 넣는다. 버튼을 빠르게 두 번 누르면 예전엔 둘 다
   * 통과했다.
   */
  async claimFree(userId: string) {
    const user = await this.mustFind(userId);
    // 회복분을 먼저 확정해야 아래 파이프라인의 $energy 가 최신값이 된다
    await this.applyRegen(user);

    // 가득이면 하루 3회뿐인 무료분을 태우게 된다. 보석은 안 나가지만
    // 유저 입장에선 똑같이 잃는 것이다.
    if ((user.energy ?? 0) >= ENERGY_CONFIG.MAX) {
      throw new BadRequestException('ENERGY_ALREADY_FULL');
    }

    const now = new Date();
    const todayStart = startOfDay(now, user.timezone);
    const todayOnly = {
      $filter: {
        input: { $ifNull: ['$freeEnergyClaims', []] },
        cond: { $gte: ['$$this', todayStart] },
      },
    };

    const updated = await this.userModel.findOneAndUpdate(
      {
        _id: user._id,
        $expr: {
          $lt: [{ $size: todayOnly }, ENERGY_CONFIG.FREE_DAILY_LIMIT],
        },
      },
      [
        {
          $set: {
            energy: {
              $min: [
                ENERGY_CONFIG.MAX,
                { $add: ['$energy', ENERGY_CONFIG.FREE_AMOUNT] },
              ],
            },
            // 지난 날짜 기록은 여기서 같이 버린다 — 배열이 무한정 자라지 않게
            freeEnergyClaims: { $concatArrays: [todayOnly, [now]] },
          },
        },
      ],
      {
        returnDocument: 'after',
        // 배열(파이프라인) 업데이트는 Mongoose 9 에서 이 옵션 없이는 거부된다.
        // 빠져 있어서 이 업데이트가 매번 예외로 실패했다
        updatePipeline: true,
      },
    );

    if (!updated) throw new BadRequestException('FREE_LIMIT_REACHED');
    return this.buildResponse(updated);
  }

  // ─────────────────────────── 소모 ───────────────────────────

  /**
   * 문제 하나 풀 때마다 1 소모. 슈퍼는 안 깎는다.
   *
   * 차감을 읽고-쓰기로 하면(문서 로드 → 계산 → save) 요청이 겹쳤을 때 전부
   * 같은 값을 읽고 같은 값을 쓴다 — N번 불러도 1만 깎인다. 이 서비스의 다른
   * 차감 경로(refill·기간권)는 이미 조건부 업데이트를 쓰는데 여기만 빠져 있었다.
   */
  async consume(userId: string, amount = 1) {
    const user = await this.mustFind(userId);
    const superActive = isSuperActive(user);
    if (superActive) return this.buildResponse(user);

    const spend = Math.max(0, Math.floor(amount || 0));

    // 회복분은 가득 아래일 때만 반영한다. 저장값이 MAX 를 넘어 있으면 그건
    // 이번 레슨 도중 받은 콤보 보너스다(완료 전이라 소비가 아직 안 빠져 있음).
    // 여기서 applyRegen 으로 MAX 로 먼저 잘라버리면 보너스가 통째로 사라진다 —
    // 소비를 뺀 **다음에** MAX 로 자른다 (아래 $min).
    if ((user.energy ?? 0) < ENERGY_CONFIG.MAX) await this.applyRegen(user);
    if (spend === 0) return this.buildResponse(user);

    // 0 밑으로는 안 내려가게 $max 로 바닥을 깐다 (파이프라인 업데이트라
    // 현재 값을 읽어 계산하는 것까지 한 번의 원자적 연산 안에서 끝난다)
    //
    // ⚠️ 가득 찬 상태에서 깎을 때는 회복 기준시각을 **지금**으로 다시 잡는다.
    // 가득 찬 동안엔 기준시각을 굳이 갱신하지 않아서(applyRegen) 며칠 전 값이
    // 남아 있다. 그대로 두면 다음 조회 때 "며칠치 회복" 이 한 번에 붙어서
    // 레슨 하나 끝내고 로드맵에 돌아오면 25 로 다시 차 있었다 — 에너지가
    // 사실상 무한이던 버그. 회복은 가득에서 내려온 순간부터 세야 한다.
    // (같은 $set 단계 안의 '$energy' 는 갱신 **전** 값을 본다)
    const now = new Date();
    const updated = await this.userModel.findOneAndUpdate(
      { _id: user._id },
      [
        {
          $set: {
            energyUpdatedAt: {
              $cond: [
                { $gte: [{ $ifNull: ['$energy', 0] }, ENERGY_CONFIG.MAX] },
                now,
                '$energyUpdatedAt',
              ],
            },
            energy: {
              $min: [
                ENERGY_CONFIG.MAX,
                {
                  $max: [
                    0,
                    { $subtract: [{ $ifNull: ['$energy', 0] }, spend] },
                  ],
                },
              ],
            },
          },
        },
      ],
      {
        returnDocument: 'after',
        // 배열(파이프라인) 업데이트는 Mongoose 9 에서 이 옵션 없이는 거부된다.
        // 빠져 있어서 이 업데이트가 매번 예외로 실패했다
        updatePipeline: true,
      },
    );

    return this.buildResponse(updated ?? user);
  }

  // ─────────────────────────── 레슨 중 차감 ───────────────────────────

  /**
   * 레슨 도중 맞힐 때마다 **바로** 깎는다.
   *
   * 예전엔 완료 때만 깎아서, 문제 몇 개 풀다 나가거나 자유↔로드를 오가면 서버엔
   * 하나도 안 깎인 채 25 로 남았다 — 다른 화면으로 가면 다시 25, 무한 루프.
   * 에너지는 계정 하나에 하나고 어디서 쓰든 그 자리에서 줄어야 한다.
   *
   * 세션 id 로 이번 판에 이미 깎은 양을 센다. 완료 때(settleSession) 그만큼은 빼고
   * 나머지만 깎으니 두 번 깎이지 않는다. 앱이 이 호출을 빼먹어도 완료 때 다 깎인다.
   */
  async spend(userId: string, sessionId: string, amount = 1) {
    const sid = String(sessionId ?? '').slice(0, 64);
    const n = Math.min(5, Math.max(1, Math.floor(Number(amount) || 1)));
    const state = await this.consume(userId, n);
    if (!sid || state.isSuper) return state;

    const uid = new Types.ObjectId(userId);
    const bumped = await this.userModel.updateOne(
      { _id: uid, 'energySession.id': sid },
      { $inc: { 'energySession.spent': n } },
    );
    if (bumped.matchedCount === 0) {
      // 새 판 — 이전 판 기록은 덮어쓴다 (진행 중인 판은 하나뿐이다)
      await this.userModel.updateOne(
        { _id: uid },
        { $set: { energySession: { id: sid, spent: n } } },
      );
    }
    return state;
  }

  /**
   * 레슨 완료 때 정산. total = 이번 판에 쓴 총량(앱이 센 본풀이 정답 수).
   * 레슨 도중 spend 로 이미 깎은 만큼을 빼고 나머지만 깎는다.
   * 완료 요청이 재시도돼도 두 번 깎지 않게, 정산한 양을 세션에 기록해 둔다.
   */
  async settleSession(
    userId: string,
    sessionId: string | undefined,
    total: number,
  ) {
    const uid = new Types.ObjectId(userId);
    let already = 0;
    if (sessionId) {
      const me = await this.userModel
        .findById(uid)
        .select('energySession')
        .lean();
      if (me?.energySession?.id === sessionId) {
        already = Math.max(0, me.energySession.spent ?? 0);
      }
    }
    const remaining = Math.max(0, Math.floor(total) - already);
    if (sessionId) {
      await this.userModel.updateOne(
        { _id: uid, 'energySession.id': sessionId },
        { $max: { 'energySession.spent': Math.floor(total) } },
      );
    }
    return this.consume(userId, remaining);
  }

  // ─────────────────────────── 콤보 보너스 ───────────────────────────

  /**
   * 4연속 정답 보너스.
   *
   * ⚠️ "정말 4연속 맞혔는지" 는 서버가 모른다 — 채점이 앱에 있다. 그래서
   *    규칙(간격·횟수·에너지 상한)은 전부 서버가 들고 있고, 앱이 언제
   *    부르든 여기서 정해진 만큼만 나간다. 예전엔 앱 말을 그대로 믿어서,
   *    이 엔드포인트를 반복 호출하는 것만으로 에너지를 계속 채울 수 있었다.
   */
  async grantComboBonus(userId: string, spentInSession = 0) {
    const user = await this.mustFind(userId);
    await this.applyRegen(user);

    // 레슨 중 차감은 **완료 때** 서버가 한꺼번에 한다. 그래서 레슨 도중의 저장값은
    // 이번 판에 쓴 만큼이 아직 안 빠져 있다 — 그걸 그대로 보면 화면엔 8 인데
    // 서버는 20 으로 보고 "넉넉하다" 며 보너스를 영영 안 준다. 앱이 이번 판에
    // 쓴 양을 같이 보낸다 (최대치로 자른다. 부풀려 봐야 받는 건 아래 한도 안이다)
    const spent = Math.min(
      ENERGY_CONFIG.MAX,
      Math.max(0, Math.floor(Number(spentInSession) || 0)),
    );
    const effective = Math.max(0, (user.energy ?? 0) - spent);

    const now = new Date();
    const todayStart = startOfDay(now, user.timezone);
    const decision = decideComboBonus({
      energy: effective,
      isSuper: isSuperActive(user),
      claimsToday: claimsSince(user.comboBonusClaims, todayStart),
      now,
    });

    // 못 주는 건 에러가 아니다. 앱은 그냥 연출을 안 하면 된다
    if (!decision.granted) return this.buildResponse(user, 0);

    const todayOnly = {
      $filter: {
        input: { $ifNull: ['$comboBonusClaims', []] },
        cond: { $gte: ['$$this', todayStart] },
      },
    };

    const updated = await this.userModel.findOneAndUpdate(
      {
        _id: user._id,
        // 조건을 여기 한 번 더 건다. 요청이 겹쳐 들어와도 한도를 못 넘는다
        energy: { $lte: COMBO_BONUS_THRESHOLD + spent },
        $expr: {
          $lt: [{ $size: todayOnly }, COMBO_BONUS_DAILY_LIMIT],
        },
      },
      [
        {
          $set: {
            energy: {
              // 저장값엔 이번 판 소비가 아직 안 빠져 있다 — 상한도 그만큼 올려야
              // 보너스가 잘리지 않는다. 완료 때 차감되면 MAX 안으로 돌아온다.
              // (중간에 나가면 다음 조회에서 computeEnergy 가 MAX 로 자른다)
              $min: [
                ENERGY_CONFIG.MAX + spent,
                { $add: ['$energy', decision.granted] },
              ],
            },
            comboBonusClaims: { $concatArrays: [todayOnly, [now]] },
          },
        },
      ],
      {
        returnDocument: 'after',
        // 배열(파이프라인) 업데이트는 Mongoose 9 에서 이 옵션 없이는 거부된다.
        // 빠져 있어서 이 업데이트가 매번 예외로 실패했다
        updatePipeline: true,
      },
    );

    // 조건이 어긋났으면(겹친 요청이 먼저 먹었다) 지급 없이 현재 상태만
    if (!updated) return this.buildResponse(user, 0);
    return this.buildResponse(updated, decision.granted);
  }

  // ─────────────────────────── 내부 ───────────────────────────

  private async mustFind(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    return user;
  }

  /**
   * 흐른 시간만큼 회복시키고, **바뀐 게 있을 때만** 저장한다.
   *
   * 예전엔 꽉 찬 유저도 호출할 때마다 energyUpdatedAt 이 now 로 바뀌어서
   * 매번 쓰기가 일어났다. 슈퍼 유저는 문제를 풀 때마다 쓸데없이 DB 를 썼다.
   */
  private async applyRegen(user: UserDocument): Promise<void> {
    const res = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      isSuperActive(user),
    );
    const sameEnergy = res.energy === user.energy;
    const sameStamp =
      res.energyUpdatedAt.getTime() ===
      new Date(user.energyUpdatedAt).getTime();
    if (sameEnergy && (sameStamp || res.isFull)) return;

    user.energy = res.energy;
    user.energyUpdatedAt = res.energyUpdatedAt;
    // ⚠️ user.save() 를 쓰면 안 된다. save 는 **문서 전체**를 스키마로 검증해서,
    // 에너지와 상관없는 필드 하나(옛 enum 값 등)만 어긋나도 throw 한다. 그러면
    // 차감(consume)·콤보 보너스가 통째로 실패하고(호출부가 삼킨다) 조회 때 회복만
    // 계속 붙어서 "레슨 끝내면 다시 25" 가 됐다. 바꾸는 두 필드만 원자적으로 쓴다.
    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          energy: res.energy,
          energyUpdatedAt: res.energyUpdatedAt,
        },
      },
    );
  }

  /**
   * 응답 한 벌.
   *
   * secondsToNext 를 인자로 받지 않고 여기서 직접 계산한다 — 부르는 쪽이
   * 0 을 넘겨서 "곧 찹니다" 로 잘못 표시되던 자리가 있었다.
   */
  private buildResponse(user: User, bonusGranted = 0) {
    const superActive = isSuperActive(user);
    const { secondsToNext } = computeEnergy(
      { energy: user.energy, energyUpdatedAt: user.energyUpdatedAt },
      superActive,
    );
    const totalMin = minutesToFull(user.energy, secondsToNext, superActive);
    const todayStart = startOfDay(new Date(), user.timezone);
    const freeUsedToday = claimsSince(user.freeEnergyClaims, todayStart).length;

    return {
      energy: user.energy,
      bonusGranted,
      maxEnergy: ENERGY_CONFIG.MAX,
      gems: user.gems,
      isSuper: superActive,
      secondsToNext,
      minutesToFull: totalMin,
      etaHours: Math.floor(totalMin / 60),
      etaMinutes: totalMin % 60,
      refillCost: ENERGY_CONFIG.REFILL_GEM_COST,
      // 무료 충전 한 번에 받는 양 — 앱이 "+10" 을 하드코딩하지 않게 같이 준다
      freeAmount: ENERGY_CONFIG.FREE_AMOUNT,
      freeRemaining: Math.max(
        0,
        ENERGY_CONFIG.FREE_DAILY_LIMIT - freeUsedToday,
      ),
    };
  }
}
