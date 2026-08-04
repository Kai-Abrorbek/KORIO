import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grammar, GrammarDocument } from './schemas/grammar.schema';

@Injectable()
export class GrammarService {
  constructor(
    @InjectModel(Grammar.name)
    private grammarModel: Model<GrammarDocument>,
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

  /** 목록 (문법 리스트 화면용, 가벼운 필드) */
  async listGrammar(lang = 'uz') {
    const rows = await this.grammarModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .select('code pattern summary tags')
      .lean();
    return rows.map((g: any) => ({
      id: g.code,
      pattern: g.pattern,
      summary: this.pick(g.summary, lang),
      tags: (g.tags || []).map((t: any) => this.pick(t, lang)).filter(Boolean),
    }));
  }
}
