import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grammar, GrammarDocument } from './schemas/grammar.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { LessonsService } from '../lessons/lessons.service';
import { StudyCategory } from '../users/utils/study-category.util';
import { isSuperActive } from '../users/super.util';

const FREE_GRAMMAR_SECTIONS = 2; // 무료 섹션 수 (이후 프리미엄)
const GRAMMAR_XP = 15; // 문법 퀴즈 통과 XP
const SECTION_COMPLETE_GEMS = 25; // 섹션 완성 보석

@Injectable()
export class GrammarService {
  constructor(
    @InjectModel(Grammar.name)
    private grammarModel: Model<GrammarDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly lessonsService: LessonsService,
  ) {}

  private pick(obj: any, lang: string): string {
    if (!obj) return '';
    return obj[lang] || obj['uz'] || obj['en'] || '';
  }

  /** 프론트 Grammar 타입 그대로 반환 */
  private format(g: any, lang: string, next?: any) {
    return {
      id: g.code,
      pattern: g.pattern,
      summary: this.pick(g.summary, lang),
      tags: (g.tags || []).map((t: any) => this.pick(t, lang)).filter(Boolean),
      explanation: this.pick(g.explanation, lang),
      conjugationRule: this.pick(g.conjugationRule, lang),
      conjugations: (g.conjugations || []).map((c: any) => ({
        base: c.base,
        result: c.result,
      })),
      examples: (g.examples || []).map((e: any) => ({
        ko: e.ko,
        gloss: this.pick(e.gloss, lang),
        highlight: e.highlight || undefined,
      })),
      dialogue: (g.dialogue || []).map((d: any) => ({
        speaker: d.speaker,
        side: d.side,
        ko: d.ko,
        gloss: this.pick(d.gloss, lang),
        highlight: d.highlight || undefined,
      })),
      similar:
        g.similar && (g.similar.pattern || this.pick(g.similar.note, lang))
          ? {
              pattern: g.similar.pattern,
              note: this.pick(g.similar.note, lang),
            }
          : undefined,
      cautions: (g.cautions || [])
        .map((c: any) => this.pick(c, lang))
        .filter(Boolean),
      quiz: (g.quiz || []).map((q: any) => ({
        question: this.pick(q.question, lang),
        options: (q.options || []).map((o: any) => ({
          text: o.text,
          correct: o.correct,
        })),
      })),
      nextId: next?.code,
      nextPattern: next?.pattern,
    };
  }

  /** 단일 문법 — 다음 문법은 order 순으로 자동 연결 */
  async getGrammar(code: string, lang = 'uz') {
    const g = await this.grammarModel.findOne({ code, isActive: true }).lean();
    if (!g) throw new NotFoundException('grammar not found');
    const next = await this.grammarModel
      .findOne({ order: { $gt: g.order }, isActive: true })
      .sort({ order: 1 })
      .select('code pattern')
      .lean();
    return this.format(g, lang, next);
  }

  /** 목록 (문법 리스트 화면용) + 완료 여부 + 섹션 순차 잠금 */
  async listGrammar(userId: string, lang = 'uz') {
    const rows = await this.grammarModel
      .find({ isActive: true })
      .sort({ section: 1, order: 1 })
      .select('code pattern summary tags section')
      .lean();

    const me = await this.userModel
      .findById(userId)
      .select('completedGrammar isSuper superExpiresAt')
      .lean();
    const done = new Set<string>(me?.completedGrammar ?? []);
    const isSuper = isSuperActive(me ?? {});

    const grammars = rows.map((g: any) => ({
      id: g.code,
      pattern: g.pattern,
      summary: this.pick(g.summary, lang),
      tags: (g.tags || []).map((t: any) => this.pick(t, lang)).filter(Boolean),
      section: g.section ?? 1,
      completed: done.has(g.code),
    }));

    // 순차 잠금: 데이터 순서대로, 이전 섹션을 전부 완료해야 다음 섹션이 열림
    const bySection = new Map<number, typeof grammars>();
    grammars.forEach((g) => {
      const arr = bySection.get(g.section) ?? [];
      arr.push(g);
      bySection.set(g.section, arr);
    });
    let unlockedThrough = 0;
    for (let s = 1; s <= 12; s++) {
      const items = bySection.get(s);
      if (!items || items.length === 0) break; // 데이터 없으면 중단
      unlockedThrough = s; // 이 섹션은 열림
      if (!items.every((g) => g.completed)) break; // 미완료면 다음은 잠금
    }

    return {
      grammars,
      unlockedThrough,
      isSuper,
      freeSections: FREE_GRAMMAR_SECTIONS,
    };
  }

  /** 문법 완료 (퀴즈 통과 시): XP · 통계 · 스트릭 · 섹션 완성 보석 */
  async completeGrammar(userId: string, code: string) {
    const g = await this.grammarModel
      .findOne({ code, isActive: true })
      .select('code section quiz')
      .lean();
    if (!g) throw new NotFoundException('grammar not found');

    const me = await this.userModel
      .findById(userId)
      .select('completedGrammar')
      .lean();
    const done = new Set<string>(me?.completedGrammar ?? []);

    // 이미 완료한 문법은 보상 없이 (중복 방지)
    if (done.has(code)) {
      return {
        success: true,
        already: true,
        xpEarned: 0,
        gemsEarned: 0,
        sectionCompleted: false,
      };
    }

    // 완료 저장
    await this.userModel.updateOne(
      { _id: userId },
      { $addToSet: { completedGrammar: code } },
    );

    // 통계 기록 (grammar 버킷, 퀴즈 문제 수만큼)
    const quizCount = (g as any).quiz?.length ?? 0;
    await this.lessonsService.recordStudy(userId, {
      questionCount: Math.max(1, quizCount),
      overrideCategory: StudyCategory.GRAMMAR,
    });

    // XP + totalXP + 리그 반영 (addXp 가 처리)
    const xpRes = await this.lessonsService.addXp(userId, GRAMMAR_XP);

    // 섹션 완성 → 보석 (섹션당 1회)
    let gemsEarned = 0;
    const section = (g as any).section ?? 1;
    const sectionCodes = await this.grammarModel
      .find({ section, isActive: true })
      .select('code')
      .lean();
    const nowDone = new Set<string>([...done, code]);
    const sectionComplete =
      sectionCodes.length > 0 &&
      sectionCodes.every((s: any) => nowDone.has(s.code));
    if (sectionComplete) {
      const already = await this.userModel.exists({
        _id: userId,
        completedGrammarSections: section,
      });
      if (!already) {
        await this.userModel.updateOne(
          { _id: userId },
          {
            $inc: { gems: SECTION_COMPLETE_GEMS },
            $addToSet: { completedGrammarSections: section },
          },
        );
        gemsEarned = SECTION_COMPLETE_GEMS;
      }
    }

    return {
      success: true,
      already: false,
      xpEarned: GRAMMAR_XP,
      totalXP: xpRes.totalXP ?? 0,
      gemsEarned,
      sectionCompleted: gemsEarned > 0,
    };
  }
}
