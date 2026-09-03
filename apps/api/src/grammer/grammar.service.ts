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

  /**
   * 단일 문법 — 다음 문법은 order 순으로 자동 연결.
   *
   * scopedToUnit 이면 같은 유닛 안에서만 다음을 찾는다. 학습 로드 모드에서
   * 하루치 문법만 도는 데 필요하다 — 안 그러면 "다음 문법" 이 유닛 밖으로
   * 계속 넘어가서 그날 분량이 끝나지 않는다.
   */
  async getGrammar(code: string, lang = 'uz', scopedToUnit = false) {
    const g = await this.grammarModel.findOne({ code, isActive: true }).lean();
    if (!g) throw new NotFoundException('grammar not found');

    const nextFilter: Record<string, any> = {
      order: { $gt: g.order },
      isActive: true,
    };
    // 범위는 이 문법 자신의 유닛에서 가져온다. 앱이 섹션·유닛을 따로 들고
    // 다닐 필요가 없다.
    if (scopedToUnit) {
      nextFilter.section = (g as any).section ?? 1;
      nextFilter.unit = (g as any).unit ?? 1;
    }

    const next = await this.grammarModel
      .findOne(nextFilter)
      .sort({ order: 1 })
      .select('code pattern')
      .lean();
    return this.format(g, lang, next);
  }

  /** 목록 (문법 리스트 화면용) + 완료 여부 + 섹션 순차 잠금 */
  /**
   * scope 를 주면 그 (섹션, 유닛) 문법만 돌려준다. 학습 로드 모드에서 하루치
   * 문법만 보여줄 때 쓴다. 이 경우 섹션 순차 잠금은 계산하지 않는다 —
   * 그날 노드에 도달한 것 자체가 이미 관문이기 때문이다.
   */
  async listGrammar(
    userId: string,
    lang = 'uz',
    scope?: { section: number; unit: number },
  ) {
    const rows = await this.grammarModel
      .find(
        scope
          ? { isActive: true, section: scope.section, unit: scope.unit }
          : { isActive: true },
      )
      .sort({ section: 1, unit: 1, order: 1 })
      .select('code pattern summary tags section unit')
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
      unit: g.unit ?? 1,
      completed: done.has(g.code),
    }));

    if (scope) {
      return {
        grammars,
        unlockedThrough: scope.section,
        isSuper,
        freeSections: FREE_GRAMMAR_SECTIONS,
      };
    }

    // 문법은 데이터가 있는 섹션을 **전부** 연다.
    //
    // 예전엔 "이전 섹션을 전부 완료해야 다음이 열리는" 순차 잠금이었다.
    // 그런데 문법은 로드맵과 별개 트랙이라, 지금 배우는 유닛에 필요한 문법이
    // 뒤쪽 섹션에 있어도 못 보는 일이 생겼다. 참고서를 앞에서부터 다 풀어야
    // 뒷장을 볼 수 있는 꼴이라 학습을 오히려 막았다.
    //
    // 유료 구분(freeSections)은 그대로 둔다 — 그건 진도가 아니라 결제 문제다.
    // 화면은 unlockedThrough 안쪽이면서 무료 범위 밖인 섹션에 프리미엄 자물쇠를
    // 띄운다(grammar-list.tsx 의 premiumLocked).
    const bySection = new Map<number, typeof grammars>();
    grammars.forEach((g) => {
      const arr = bySection.get(g.section) ?? [];
      arr.push(g);
      bySection.set(g.section, arr);
    });
    let unlockedThrough = 0;
    for (let s = 1; s <= 12; s++) {
      const items = bySection.get(s);
      if (!items || items.length === 0) break; // 데이터가 없는 섹션부터는 표시할 게 없다
      unlockedThrough = s;
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
