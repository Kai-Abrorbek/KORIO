import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, type QueryFilter } from 'mongoose';
import { ListWordsQueryDto } from './dto/list-words-query.dto';
import {
  allowedStarts,
  isPlayable,
  precheckChainWord,
} from './game-words.util';
import { ReviewQueueQueryDto } from './dto/review-queue-query.dto';
import { WordReviewResult } from './dto/review-word.dto';
import {
  UserWordProgress,
  UserWordProgressDocument,
  UserWordState,
} from './schemas/user-word-progress.schema';
import {
  Word,
  WordDocument,
  type WordLanguage,
  type WordPlacement,
} from './schemas/word.schema';

type WordRecord = Word & { _id: Types.ObjectId };
type ProgressRecord = UserWordProgress & { _id: Types.ObjectId };

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name)
    private readonly wordModel: Model<WordDocument>,
    @InjectModel(UserWordProgress.name)
    private readonly progressModel: Model<UserWordProgressDocument>,
  ) {}

  async getWords(userId: string, query: ListWordsQueryDto) {
    const filter = this.buildScopeFilter(query.section, query.unit);
    const words = (await this.wordModel.find(filter).lean()) as WordRecord[];
    const sorted = this.sortWords(words, query.section, query.unit);
    const limit = query.limit ?? 50;

    let startIndex = 0;
    if (query.cursor) {
      const cursorIndex = sorted.findIndex((word) => word.code === query.cursor);
      if (cursorIndex === -1) {
        throw new BadRequestException('INVALID_WORD_CURSOR');
      }
      startIndex = cursorIndex + 1;
    }

    const page = sorted.slice(startIndex, startIndex + limit);
    const progressByWordId = await this.getProgressMap(
      userId,
      page.map((word) => word._id),
    );
    const hasNextPage = startIndex + page.length < sorted.length;

    return {
      items: page.map((word) =>
        this.serializeWord(
          word,
          query.lang,
          progressByWordId.get(word._id.toString()),
          query.section,
          query.unit,
        ),
      ),
      total: sorted.length,
      nextCursor: hasNextPage ? page.at(-1)?.code || null : null,
    };
  }

  async getWord(userId: string, id: string, lang: WordLanguage) {
    const word = await this.findWord(id);
    const progress = await this.progressModel
      .findOne({ userId: new Types.ObjectId(userId), wordId: word._id })
      .lean();

    return this.serializeWord(word, lang, progress as ProgressRecord | null);
  }

  async getSectionSummary(userId: string, section: number) {
    if (!Number.isInteger(section) || section < 1) {
      throw new BadRequestException('INVALID_WORD_SECTION');
    }

    const words = (await this.wordModel
      .find({ isActive: true, 'placements.section': section })
      .select({ _id: 1, placements: 1 })
      .lean()) as WordRecord[];
    const progressByWordId = await this.getProgressMap(
      userId,
      words.map((word) => word._id),
    );
    const now = new Date();
    const unitWordIds = new Map<number, Set<string>>();

    for (const word of words) {
      for (const placement of word.placements || []) {
        if (placement.section !== section) continue;
        if (!unitWordIds.has(placement.unit)) {
          unitWordIds.set(placement.unit, new Set());
        }
        unitWordIds.get(placement.unit)?.add(word._id.toString());
      }
    }

    const summarize = (wordIds: string[]) => {
      const summary: Record<UserWordState, number> & {
        words: number;
        due: number;
      } = {
        words: wordIds.length,
        new: 0,
        learning: 0,
        review: 0,
        mastered: 0,
        due: 0,
      };

      for (const wordId of wordIds) {
        const progress = progressByWordId.get(wordId);
        const state = progress?.state || UserWordState.NEW;
        summary[state] += 1;
        if (this.isDue(progress, now)) summary.due += 1;
      }

      return summary;
    };

    const uniqueWordIds = words.map((word) => word._id.toString());
    const units = [...unitWordIds.entries()]
      .sort(([a], [b]) => a - b)
      .map(([unit, ids]) => ({ unit, ...summarize([...ids]) }));

    return {
      section,
      unitCount: units.length,
      ...summarize(uniqueWordIds),
      units,
    };
  }

  async getReviewQueue(userId: string, query: ReviewQueueQueryDto) {
    const filter = this.buildScopeFilter(query.section, query.unit);
    const words = (await this.wordModel.find(filter).lean()) as WordRecord[];
    const progressByWordId = await this.getProgressMap(
      userId,
      words.map((word) => word._id),
    );
    const now = new Date();
    const limit = query.limit ?? 20;

    const queue = this.sortWords(words, query.section, query.unit)
      .map((word) => {
        const progress = progressByWordId.get(word._id.toString());
        if (progress?.state === UserWordState.MASTERED) return null;

        const isNew = !progress || progress.state === UserWordState.NEW;
        if (!isNew && !this.isDue(progress, now)) return null;

        return {
          word,
          progress,
          queueReason: isNew ? ('new' as const) : ('due' as const),
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .sort((a, b) => {
        if (a.queueReason !== b.queueReason) {
          return a.queueReason === 'due' ? -1 : 1;
        }
        if (a.queueReason === 'due' && b.queueReason === 'due') {
          const aTime = a.progress?.nextReviewAt?.getTime() || 0;
          const bTime = b.progress?.nextReviewAt?.getTime() || 0;
          return aTime - bTime;
        }
        return 0;
      });

    const selected = queue.slice(0, limit);
    return {
      items: selected.map(({ word, progress, queueReason }) => ({
        ...this.serializeWord(
          word,
          query.lang,
          progress,
          query.section,
          query.unit,
        ),
        queueReason,
      })),
      count: selected.length,
      remaining: Math.max(0, queue.length - selected.length),
    };
  }

  async reviewWord(userId: string, id: string, result: WordReviewResult) {
    const word = await this.findWord(id);
    const userObjectId = new Types.ObjectId(userId);
    const current = (await this.progressModel
      .findOne({ userId: userObjectId, wordId: word._id })
      .lean()) as ProgressRecord | null;
    const now = new Date();
    const next = this.calculateReview(current, result, now);

    const progress = await this.progressModel.findOneAndUpdate(
      { userId: userObjectId, wordId: word._id },
      {
        $setOnInsert: { userId: userObjectId, wordId: word._id },
        $set: next,
      },
      { upsert: true, returnDocument: 'after' },
    );

    return {
      wordId: word._id.toString(),
      progress: this.serializeProgress(progress),
    };
  }

  /**
   * 카드로 "봤다"는 기록. 퀴즈가 아니라 노출이므로 정답 수나 ease 는 건드리지
   * 않는다 — 그것까지 올리면 실제로 테스트한 적 없는 단어가 복습 큐에서
   * 빠져버린다. 아직 NEW 인 단어만 LEARNING 으로 올리고 첫 복습일을 잡아준다.
   */
  async markSeen(userId: string, ids: string[]) {
    const userObjectId = new Types.ObjectId(userId);
    const wordIds = [...new Set(ids)]
      .filter((id) => Types.ObjectId.isValid(id))
      .map((id) => new Types.ObjectId(id));
    if (!wordIds.length) return { seen: 0 };

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // 두 번째 op 는 이미 있던 NEW 문서만 건드린다. 첫 번째 op 가 방금 만든
    // 문서는 이미 LEARNING 이라 걸리지 않는다.
    const ops = wordIds.flatMap((wordId) => [
      {
        updateOne: {
          filter: { userId: userObjectId, wordId },
          update: {
            $setOnInsert: {
              userId: userObjectId,
              wordId,
              state: UserWordState.LEARNING,
              intervalDays: 1,
              nextReviewAt: tomorrow,
            },
            $set: { lastReviewedAt: now },
          },
          upsert: true,
        },
      },
      {
        updateOne: {
          filter: { userId: userObjectId, wordId, state: UserWordState.NEW },
          update: {
            $set: {
              state: UserWordState.LEARNING,
              intervalDays: 1,
              nextReviewAt: tomorrow,
              lastReviewedAt: now,
            },
          },
        },
      },
    ]);

    await this.progressModel.bulkWrite(ops as any, { ordered: false });
    return { seen: wordIds.length };
  }

  async masterWord(userId: string, id: string) {
    const word = await this.findWord(id);
    const userObjectId = new Types.ObjectId(userId);
    const now = new Date();
    const progress = await this.progressModel.findOneAndUpdate(
      { userId: userObjectId, wordId: word._id },
      {
        $setOnInsert: { userId: userObjectId, wordId: word._id },
        $set: {
          state: UserWordState.MASTERED,
          intervalDays: 30,
          nextReviewAt: null,
          lastReviewedAt: now,
          masteredAt: now,
        },
      },
      { upsert: true, returnDocument: 'after' },
    );

    return {
      wordId: word._id.toString(),
      progress: this.serializeProgress(progress),
    };
  }

  private buildScopeFilter(
    section?: number,
    unit?: number,
  ): QueryFilter<Word> {
    if (unit && !section) {
      throw new BadRequestException('WORD_SECTION_REQUIRED_WITH_UNIT');
    }

    const filter: QueryFilter<Word> = { isActive: true };
    if (section && unit) {
      filter.placements = { $elemMatch: { section, unit } };
    } else if (section) {
      filter['placements.section'] = section;
    }
    return filter;
  }

  private async findWord(idOrCode: string): Promise<WordRecord> {
    const identity = Types.ObjectId.isValid(idOrCode)
      ? { _id: new Types.ObjectId(idOrCode) }
      : { code: idOrCode };
    const word = (await this.wordModel
      .findOne({ ...identity, isActive: true })
      .lean()) as WordRecord | null;
    if (!word) throw new NotFoundException('WORD_NOT_FOUND');
    return word;
  }

  private async getProgressMap(userId: string, wordIds: Types.ObjectId[]) {
    if (wordIds.length === 0) return new Map<string, ProgressRecord>();
    const progress = (await this.progressModel
      .find({
        userId: new Types.ObjectId(userId),
        wordId: { $in: wordIds },
      })
      .lean()) as ProgressRecord[];
    return new Map(progress.map((item) => [item.wordId.toString(), item]));
  }

  private sortWords(words: WordRecord[], section?: number, unit?: number) {
    return [...words].sort((a, b) => {
      const aPlacement = this.findPlacement(a, section, unit);
      const bPlacement = this.findPlacement(b, section, unit);
      const sectionDiff =
        (aPlacement?.section ?? Number.MAX_SAFE_INTEGER) -
        (bPlacement?.section ?? Number.MAX_SAFE_INTEGER);
      if (sectionDiff !== 0) return sectionDiff;
      const unitDiff =
        (aPlacement?.unit ?? Number.MAX_SAFE_INTEGER) -
        (bPlacement?.unit ?? Number.MAX_SAFE_INTEGER);
      if (unitDiff !== 0) return unitDiff;
      const orderDiff =
        (aPlacement?.order ?? Number.MAX_SAFE_INTEGER) -
        (bPlacement?.order ?? Number.MAX_SAFE_INTEGER);
      if (orderDiff !== 0) return orderDiff;
      return a.headword.localeCompare(b.headword, 'ko');
    });
  }

  private findPlacement(
    word: WordRecord,
    section?: number,
    unit?: number,
  ): WordPlacement | undefined {
    const placements = word.placements || [];
    return (
      placements.find(
        (placement) =>
          (!section || placement.section === section) &&
          (!unit || placement.unit === unit),
      ) ||
      [...placements].sort(
        (a, b) =>
          a.section - b.section || a.unit - b.unit || a.order - b.order,
      )[0]
    );
  }

  private serializeWord(
    word: WordRecord,
    lang: WordLanguage,
    progress?: ProgressRecord | UserWordProgressDocument | null,
    section?: number,
    unit?: number,
  ) {
    const placement = this.findPlacement(word, section, unit);
    return {
      id: word._id.toString(),
      code: word.code,
      headword: word.headword,
      senseKey: word.senseKey,
      partOfSpeech: word.partOfSpeech,
      meaning: this.localize(word.meaning, lang, word.headword),
      examples: (word.examples || []).map((example) => ({
        korean: example.korean,
        translation: this.localize(example.translations, lang),
      })),
      pronunciation: {
        hangul: word.pronunciation?.hangul || word.headword,
        romanization: word.pronunciation?.romanization || '',
        ttsText: word.pronunciation?.ttsText || word.headword,
      },
      media: {
        emoji: word.media?.emoji || '',
        imageUrl: word.media?.imageUrl || '',
        imageAlt: this.localize(word.media?.imageAlt, lang),
      },
      placement: placement || null,
      placements: word.placements || [],
      tags: word.tags || [],
      difficulty: word.difficulty,
      usageNote: this.localize(word.usageNote, lang),
      progress: this.serializeProgress(progress),
    };
  }

  private serializeProgress(
    progress?: ProgressRecord | UserWordProgressDocument | null,
  ) {
    if (!progress) {
      return {
        state: UserWordState.NEW,
        correctCount: 0,
        incorrectCount: 0,
        consecutiveCorrect: 0,
        easeFactor: 2.5,
        intervalDays: 0,
        nextReviewAt: null,
        lastReviewedAt: null,
        masteredAt: null,
        isDue: false,
      };
    }

    return {
      state: progress.state,
      correctCount: progress.correctCount,
      incorrectCount: progress.incorrectCount,
      consecutiveCorrect: progress.consecutiveCorrect,
      easeFactor: progress.easeFactor,
      intervalDays: progress.intervalDays,
      nextReviewAt: progress.nextReviewAt,
      lastReviewedAt: progress.lastReviewedAt,
      masteredAt: progress.masteredAt,
      isDue: this.isDue(progress, new Date()),
    };
  }

  private isDue(
    progress: ProgressRecord | UserWordProgressDocument | undefined,
    now: Date,
  ) {
    if (!progress || progress.state === UserWordState.NEW) return false;
    if (progress.state === UserWordState.MASTERED) return false;
    if (!progress.nextReviewAt) return true;
    return progress.nextReviewAt.getTime() <= now.getTime();
  }

  private localize(
    value: Partial<Record<WordLanguage, string>> | undefined,
    lang: WordLanguage,
    fallback = '',
  ) {
    return (
      value?.[lang] ||
      value?.uz ||
      value?.en ||
      value?.ru ||
      value?.ko ||
      fallback
    );
  }

  private calculateReview(
    current: ProgressRecord | null,
    result: WordReviewResult,
    now: Date,
  ) {
    const currentInterval = current?.intervalDays || 0;
    const currentEase = current?.easeFactor || 2.5;
    const wasCorrect = result !== WordReviewResult.AGAIN;
    let easeFactor = currentEase;
    let intervalDays = currentInterval;
    let isShortRetry = false;

    switch (result) {
      case WordReviewResult.AGAIN:
        easeFactor = Math.max(1.3, currentEase - 0.2);
        intervalDays = 0;
        isShortRetry = true;
        break;
      case WordReviewResult.HARD:
        easeFactor = Math.max(1.3, currentEase - 0.15);
        intervalDays =
          currentInterval <= 0
            ? 1
            : Math.max(1, Math.round(currentInterval * 1.2));
        break;
      case WordReviewResult.EASY:
        easeFactor = Math.min(3, currentEase + 0.15);
        intervalDays =
          currentInterval <= 0
            ? 4
            : Math.max(
                4,
                Math.round(currentInterval * easeFactor * 1.5),
              );
        break;
      case WordReviewResult.GOOD:
      default:
        intervalDays =
          currentInterval <= 0
            ? 1
            : currentInterval === 1
              ? 3
              : Math.round(currentInterval * easeFactor);
        break;
    }

    intervalDays = Math.min(intervalDays, 3650);
    const nextReviewAt = isShortRetry
      ? new Date(now.getTime() + 10 * 60 * 1000)
      : this.addDays(now, intervalDays);
    const consecutiveCorrect = wasCorrect
      ? (current?.consecutiveCorrect || 0) + 1
      : 0;
    const mastered = consecutiveCorrect >= 5 && intervalDays >= 21;
    const state = mastered
      ? UserWordState.MASTERED
      : intervalDays <= 1
        ? UserWordState.LEARNING
        : UserWordState.REVIEW;

    return {
      state,
      correctCount: (current?.correctCount || 0) + (wasCorrect ? 1 : 0),
      incorrectCount:
        (current?.incorrectCount || 0) + (wasCorrect ? 0 : 1),
      consecutiveCorrect,
      easeFactor,
      intervalDays,
      nextReviewAt: mastered ? null : nextReviewAt,
      lastReviewedAt: now,
      masteredAt: mastered ? now : null,
    };
  }

  private addDays(date: Date, days: number) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }
  // ─────────────────────────── 게임용 단어 ───────────────────────────

  /**
   * 미니게임에 쓸 단어 묶음.
   *
   * 게임은 배우는 자리가 아니라 굳히는 자리다. 처음 보는 단어를 카드로
   * 뒤집어 봐야 외워지지 않는다. 그래서 **이미 만난 단어**를 먼저 쓰고,
   * 모자랄 때만 쉬운 것부터 채운다.
   *
   * 난이도를 따로 고르게 하지 않는 이유도 같다. 유저가 어디까지 왔는지는
   * 서버가 알고 있으니, 그 사람의 진도가 곧 난이도다.
   */
  async getGamePool(
    userId: string,
    opts: { count?: number; maxLen?: number } = {},
  ) {
    const count = Math.min(Math.max(opts.count ?? 40, 4), 120);
    const maxLen = Math.min(Math.max(opts.maxLen ?? 5, 2), 8);

    const seen = await this.progressModel
      .find({ userId: new Types.ObjectId(userId) })
      .select('wordId')
      .limit(600)
      .lean();
    const seenIds = seen.map((s: any) => s.wordId);

    const pick = (rows: any[]) =>
      rows.filter((w) =>
        isPlayable(w.headword, maxLen, w.meaning ?? {}),
      );

    // 1) 이미 만난 단어
    let pool = seenIds.length
      ? pick(
          await this.wordModel
            .find({ _id: { $in: seenIds }, isActive: true })
            .select('headword meaning media difficulty')
            .lean(),
        )
      : [];

    // 2) 모자라면 쉬운 것부터 채운다.
    //    처음 들어온 유저도 게임은 돌아가야 한다 — 빈 화면을 보여줄 수는 없다
    if (pool.length < count) {
      const filler = pick(
        await this.wordModel
          .find({
            isActive: true,
            ...(seenIds.length ? { _id: { $nin: seenIds } } : {}),
          })
          .select('headword meaning media difficulty')
          .sort({ difficulty: 1 })
          .limit((count - pool.length) * 4 + 60)
          .lean(),
      );
      pool = pool.concat(filler);
    }

    return {
      words: shuffle(pool)
        .slice(0, count)
        .map((w: any) => ({
          id: String(w._id),
          ko: w.headword,
          uz: w.meaning?.uz ?? '',
          en: w.meaning?.en ?? '',
          ru: w.meaning?.ru ?? '',
          meaningKo: w.meaning?.ko ?? '',
          emoji: w.media?.emoji ?? '',
          difficulty: w.difficulty ?? 1,
        })),
      /** 진도 기반인지 (false 면 아직 배운 게 없어서 기본 단어로 채웠다) */
      fromProgress: seenIds.length > 0,
    };
  }

  /**
   * 끝말잇기 한 수.
   *
   * 예전엔 앱이 들고 있는 하드코딩 목록 안에서만 답이 인정됐다. 유저가 아는
   * 멀쩡한 한국어 단어를 내도 "그런 단어 없다" 가 나왔고, 그래서 게임이
   * 되는 것처럼 보였을 뿐이다. 이제 우리 단어 사전 전체를 본다.
   */
  async chainTurn(
    userId: string,
    body: { word: string; used?: string[]; prev?: string | null },
  ) {
    const used = (body.used ?? []).slice(0, 200);
    const check = precheckChainWord(body.word, body.prev ?? null, used);
    if (!check.ok) return { accepted: false, reason: check.reason };

    const word = body.word.trim();
    const found = await this.wordModel
      .findOne({ headword: word, isActive: true })
      .select('headword meaning media')
      .lean();
    if (!found) return { accepted: false, reason: 'UNKNOWN_WORD' as const };

    // 이제 우리 차례. 유저 단어의 끝 글자로 시작하는 단어를 찾는다
    const starts = allowedStarts(word.slice(-1));
    const taken = [...used, word];

    const reply = starts.length
      ? await this.wordModel
          .findOne({
            isActive: true,
            headword: {
              $regex: `^[${starts.join('')}]`,
              $nin: taken,
            },
            $expr: { $lte: [{ $strLenCP: '$headword' }, 5] },
          })
          .select('headword meaning media')
          .sort({ difficulty: 1 })
          .skip(Math.floor(Math.random() * 8))
          .lean()
      : null;

    return {
      accepted: true,
      word: {
        ko: found.headword,
        uz: (found as any).meaning?.uz ?? '',
        en: (found as any).meaning?.en ?? '',
        ru: (found as any).meaning?.ru ?? '',
        emoji: (found as any).media?.emoji ?? '',
      },
      /** 우리 차례의 답. null 이면 더 낼 단어가 없다 = 유저 승 */
      reply: reply
        ? {
            ko: (reply as any).headword,
            uz: (reply as any).meaning?.uz ?? '',
            en: (reply as any).meaning?.en ?? '',
            ru: (reply as any).meaning?.ru ?? '',
            emoji: (reply as any).media?.emoji ?? '',
          }
        : null,
    };
  }

  /**
   * 끝말잇기 힌트.
   *
   * ⚠️ 반드시 **서버 사전에서** 뽑아야 한다. 앱이 들고 있던 목록에서 뽑으면
   *    힌트대로 쳤는데 "그런 단어 없다" 가 나온다 — 힌트가 함정이 된다.
   */
  async chainHints(start: string, exclude: string[] = [], limit = 3) {
    const starts = allowedStarts((start ?? '').trim().slice(-1));
    if (!starts.length) return { words: [] };
    const rows = await this.wordModel
      .find({
        isActive: true,
        headword: { $regex: `^[${starts.join('')}]`, $nin: exclude.slice(0, 200) },
        $expr: { $lte: [{ $strLenCP: '$headword' }, 5] },
      })
      .select('headword meaning')
      .sort({ difficulty: 1 })
      .limit(Math.min(Math.max(limit, 1), 5))
      .lean();
    return {
      words: rows.map((w: any) => ({
        ko: w.headword,
        uz: w.meaning?.uz ?? '',
        en: w.meaning?.en ?? '',
        ru: w.meaning?.ru ?? '',
      })),
    };
  }

  /** 끝말잇기 첫 단어 */
  async chainStart() {
    const rows = await this.wordModel
      .find({ isActive: true, difficulty: { $lte: 2 } })
      .select('headword meaning media')
      .limit(300)
      .lean();
    const playable = rows.filter((w: any) =>
      isPlayable(w.headword, 4, w.meaning ?? {}),
    );
    // 끝 글자가 'ㅡ'로 끝나거나 이어가기 어려운 글자는 첫 수로 안 좋다.
    // 완벽하게 거르진 않고, 흔한 막다른 글자만 피한다
    const DEAD_END = /[늪릎븧쁨]$/;
    const good = playable.filter((w: any) => !DEAD_END.test(w.headword));
    const pickFrom = good.length ? good : playable;
    const w: any = pickFrom[Math.floor(Math.random() * pickFrom.length)];
    if (!w) return { word: null };
    return {
      word: {
        ko: w.headword,
        uz: w.meaning?.uz ?? '',
        en: w.meaning?.en ?? '',
        ru: w.meaning?.ru ?? '',
        emoji: w.media?.emoji ?? '',
      },
    };
  }

}

/** 피셔-예이츠. 매번 같은 순서로 나오면 게임이 아니다 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
