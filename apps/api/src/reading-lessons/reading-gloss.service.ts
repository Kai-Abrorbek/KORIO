import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GLOSS_MODEL,
  GLOSS_TIMEOUT_MS,
  GRAMMAR_TAGS,
  WORD_POS,
} from './reading-gloss.const';
import { normalizeWord, readingWords } from './reading-words.util';
import {
  ReadingGlossCache,
  ReadingGlossCacheDocument,
} from './schemas/reading-gloss-cache.schema';

const OPENAI_API = 'https://api.openai.com/v1';

export interface WordGloss {
  word: string;
  lemma: string;
  pos: string;
  meaning: { ko: string; uz: string; en: string; ru: string };
  grammar: string[];
  note?: { ko: string; uz: string; en: string; ru: string };
}

/** strict 모드는 maxItems/maxLength 를 지원하지 않는다. 개수는 sanitize 에서 자른다 */
const GLOSS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['lemma', 'pos', 'meaning', 'grammar'],
  properties: {
    lemma: { type: 'string', description: 'Dictionary form, e.g. 가다' },
    pos: { type: 'string', enum: [...WORD_POS] },
    meaning: {
      type: 'object',
      additionalProperties: false,
      required: ['ko', 'uz', 'en', 'ru'],
      properties: {
        ko: { type: 'string', description: 'Plain Korean paraphrase' },
        uz: { type: 'string' },
        en: { type: 'string' },
        ru: { type: 'string' },
      },
    },
    grammar: {
      type: 'array',
      items: { type: 'string', enum: [...GRAMMAR_TAGS] },
      description: 'Grammar attached to this surface form. Empty if none.',
    },
  },
} as const;

/**
 * 단어 뜻보기.
 *
 * 정상 경로는 **시드에 이미 들어 있는 glossary** 다. 이 서비스는 거기 빠진
 * 단어를 한 번 채워 넣는 보충 장치다 — 첫 유저만 잠깐 기다리고 그 뒤로는
 * 캐시에서 즉시 나간다.
 *
 * ⚠️ 아무 단어나 번역해 주지 않는다. **그 레슨 본문에 실제로 있는 단어만**
 * 처리한다. 안 그러면 우리 OpenAI 키로 돌아가는 공짜 번역 API 가 된다.
 */
@Injectable()
export class ReadingGlossService {
  private readonly logger = new Logger(ReadingGlossService.name);

  constructor(
    @InjectModel(ReadingGlossCache.name)
    private readonly cacheModel: Model<ReadingGlossCacheDocument>,
  ) {}

  /** 이 레슨에서 런타임에 채워둔 것들 */
  async cachedFor(lessonCode: string): Promise<WordGloss[]> {
    const rows = await this.cacheModel.find({ lessonCode }).lean();
    return rows.map((row) => ({
      word: row.word,
      lemma: row.lemma,
      pos: row.pos,
      meaning: row.meaning as WordGloss['meaning'],
      grammar: row.grammar ?? [],
      note: row.note as WordGloss['note'],
    }));
  }

  /**
   * 단어 하나를 보충한다.
   * 이미 있으면 그대로, 없으면 만들어서 저장하고 돌려준다.
   */
  async resolve(
    lessonCode: string,
    word: string,
    passageText: string,
  ): Promise<WordGloss | null> {
    const target = word.trim().slice(0, 40);
    if (!target) throw new BadRequestException('WORD_REQUIRED');

    // 본문에 없는 단어는 거절한다. 이 검사가 이 엔드포인트의 전부다
    const inPassage = readingWords(passageText).some(
      (w) => normalizeWord(w) === normalizeWord(target),
    );
    if (!inPassage) throw new BadRequestException('WORD_NOT_IN_PASSAGE');

    const existing = await this.cacheModel.findOne({ lessonCode, word: target });
    if (existing) {
      return {
        word: existing.word,
        lemma: existing.lemma,
        pos: existing.pos,
        meaning: existing.meaning as WordGloss['meaning'],
        grammar: existing.grammar ?? [],
        note: existing.note as WordGloss['note'],
      };
    }

    const generated = await this.ask(target, passageText);
    if (!generated) return null;

    // 동시에 두 명이 같은 단어를 눌러도 문서가 둘로 갈라지지 않게 upsert
    await this.cacheModel
      .updateOne(
        { lessonCode, word: target },
        { $setOnInsert: { ...generated, lessonCode, word: target, model: GLOSS_MODEL } },
        { upsert: true },
      )
      .catch((error) => {
        this.logger.warn(`뜻보기 저장 실패: ${error?.message}`);
      });

    return { word: target, ...generated };
  }

  private async ask(
    word: string,
    passageText: string,
  ): Promise<Omit<WordGloss, 'word'> | null> {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return null;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), GLOSS_TIMEOUT_MS);

    const system = [
      'You gloss ONE Korean word for a beginner learner reading a passage.',
      'The word is given exactly as it appears in the text, so it is usually inflected',
      'or has particles attached (갔습니다, 학교에서). Report:',
      '- lemma: the dictionary form (가다, 학교). For a bare noun, the noun itself.',
      '- pos: part of speech of the lemma.',
      '- meaning: the meaning of the LEMMA, in its dictionary form. NOT of the',
      '  inflected surface form. 가다 is "to go" / "bormoq" — never "went" / "bordi",',
      '  even when the text says 갔습니다. Tense and speech level are reported in',
      '  "grammar", so putting them in the meaning too makes the two contradict.',
      '  Short — a word or a short phrase, never a sentence.',
      '  "ko" is a plain-Korean paraphrase of the lemma.',
      '- grammar: tags for what is attached to the lemma here. Empty array if nothing.',
      'Use the passage only to disambiguate (말 = horse vs speech). Do not translate the passage.',
    ].join('\n');

    try {
      const res = await fetch(`${OPENAI_API}/chat/completions`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GLOSS_MODEL,
          temperature: 0,
          messages: [
            { role: 'system', content: system },
            {
              role: 'user',
              content: `WORD: ${word}\n\nPASSAGE:\n${passageText.slice(0, 2000)}`,
            },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'word_gloss',
              strict: true,
              schema: GLOSS_SCHEMA,
            },
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        this.logger.warn(`뜻보기 생성 실패 ${res.status}: ${text.slice(0, 200)}`);
        return null;
      }

      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = data.choices?.[0]?.message?.content;
      if (!content) return null;
      return this.sanitize(JSON.parse(content));
    } catch (error: any) {
      this.logger.warn(`뜻보기 생성 중단: ${error?.message ?? error}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  /** 모델 출력을 그대로 믿지 않는다. 이 값이 화면에 그대로 나간다 */
  private sanitize(raw: any): Omit<WordGloss, 'word'> {
    const text = (v: any) =>
      typeof v === 'string' ? v.trim().slice(0, 120) : '';
    return {
      lemma: text(raw?.lemma),
      pos: (WORD_POS as readonly string[]).includes(raw?.pos)
        ? raw.pos
        : 'other',
      meaning: {
        ko: text(raw?.meaning?.ko),
        uz: text(raw?.meaning?.uz),
        en: text(raw?.meaning?.en),
        ru: text(raw?.meaning?.ru),
      },
      grammar: Array.from(
        new Set<string>(
          (Array.isArray(raw?.grammar) ? (raw.grammar as unknown[]) : [])
            .filter(
              (tag): tag is string =>
                typeof tag === 'string' &&
                (GRAMMAR_TAGS as readonly string[]).includes(tag),
            ),
        ),
      ).slice(0, 4),
    };
  }
}
