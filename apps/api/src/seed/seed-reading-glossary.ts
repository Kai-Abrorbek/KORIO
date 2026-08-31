import Anthropic from '@anthropic-ai/sdk';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import {
  GRAMMAR_TAGS,
  WORD_POS,
} from '../reading-lessons/reading-gloss.const';
import { readingWords } from '../reading-lessons/reading-words.util';
import {
  ReadingLesson,
  ReadingLessonDocument,
} from '../reading-lessons/schemas/reading-lesson.schema';

/**
 * 읽기 본문 단어뜻 자동 생성.
 *
 * 지문은 이미 정해져 있으므로 유저가 단어를 누를 때마다 모델을 부를 이유가
 * 없다. 여기서 한 번 만들어 DB 에 넣어두면 앱에서는 네트워크 없이 즉시 뜬다.
 *
 * ── 구조 ──
 * 지문 하나 = 호출 하나. 단어마다 부르지 않는다. 문맥이 있어야 "말" 이
 * horse 인지 speech 인지 갈리고, 비용도 지문 단위가 훨씬 싸다.
 *
 * 두 층으로 받는다:
 *   words  : 표면형 → { 기본형, 품사, 문법태그 }   ← 활용 정보
 *   lemmas : 기본형 → { ko, uz, en, ru }            ← 뜻
 *
 * **뜻은 기본형에만 매단다.** 갔습니다의 뜻은 "went" 가 아니라 가다의
 * "to go" 다. 시제·말투는 문법 태그가 이미 들고 있어서, 뜻에까지 넣으면 둘이
 * 어긋나고 같은 기본형이 지문마다 다른 뜻을 갖게 된다.
 * 저장할 때만 표면형 쪽으로 펼친다 — 앱이 조회를 두 번 하지 않게.
 *
 * ── 실행 ──
 *   pnpm --filter api gloss:seed                 # 비어 있는 레슨만
 *   pnpm --filter api gloss:seed -- --level 1
 *   pnpm --filter api gloss:seed -- --force      # 이미 있는 것도 다시
 *   pnpm --filter api gloss:seed -- --dry        # DB 안 건드리고 JSON 으로만
 *   pnpm --filter api gloss:seed -- --limit 3    # 몇 개만 먼저 보고 판단
 */

const MODEL =
  process.env.ANTHROPIC_GLOSS_MODEL?.trim() ||
  process.env.ANTHROPIC_MODEL?.trim() ||
  'claude-haiku-4-5-20251001';

/** 호출 사이 간격(ms). 레이트 리밋에 부딪히지 않을 정도로만 */
const CALL_GAP_MS = 400;
const MAX_RETRY = 2;

interface Args {
  level?: number;
  force: boolean;
  dry: boolean;
  limit?: number;
}

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const value = (flag: string) => {
    const i = argv.indexOf(flag);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const level = value('--level');
  const limit = value('--limit');
  return {
    level: level ? Number(level) : undefined,
    force: argv.includes('--force'),
    dry: argv.includes('--dry'),
    limit: limit ? Number(limit) : undefined,
  };
}

// ── 모델에 넘길 도구 정의 ──────────────────────────────────
//
// 자유 서술 대신 tool 로 받는다. Anthropic 은 tool_choice 로 스키마를 강제할 수
// 있어서, "가끔 JSON 앞뒤에 설명을 붙이는" 문제를 아예 없앤다.

const GLOSS_TOOL: Anthropic.Tool = {
  name: 'submit_glossary',
  description: 'Return the word-by-word glossary for the passage.',
  input_schema: {
    type: 'object',
    required: ['words', 'lemmas'],
    properties: {
      words: {
        type: 'array',
        description: 'One entry per word given, same order, none skipped.',
        items: {
          type: 'object',
          required: ['surface', 'lemma', 'pos', 'grammar'],
          properties: {
            surface: {
              type: 'string',
              description: 'The word exactly as given.',
            },
            lemma: {
              type: 'string',
              description:
                'Dictionary form. Strip particles from nouns (학교에 → 학교). Verbs and adjectives end in -다 (갔습니다 → 가다).',
            },
            pos: { type: 'string', enum: [...WORD_POS] },
            grammar: {
              type: 'array',
              items: { type: 'string', enum: [...GRAMMAR_TAGS] },
              description:
                'What this surface form adds on top of the lemma. Empty array if it is the bare lemma.',
            },
          },
        },
      },
      lemmas: {
        type: 'array',
        description: 'One entry per DISTINCT lemma used above.',
        items: {
          type: 'object',
          required: ['lemma', 'ko', 'uz', 'en', 'ru'],
          properties: {
            lemma: { type: 'string' },
            ko: {
              type: 'string',
              description: 'Plain-Korean paraphrase of the lemma.',
            },
            uz: { type: 'string' },
            en: { type: 'string' },
            ru: { type: 'string' },
          },
        },
      },
    },
  },
};

const SYSTEM = [
  'You gloss Korean reading passages for beginner learners whose native language is Uzbek.',
  '',
  'THE ONE RULE THAT MATTERS MOST:',
  'Meanings belong to the LEMMA, never to the inflected form.',
  '  갔습니다 → lemma 가다 → "to go", "bormoq".   NOT "went", NOT "bordi".',
  '  학교에서 → lemma 학교 → "school", "maktab".  NOT "at school".',
  'Tense, politeness and particles are reported in "grammar" tags instead. If you put',
  'them in the meaning too, the two contradict each other and the same lemma ends up',
  'with a different meaning in every passage.',
  '',
  'Other rules:',
  '- Return EVERY word given, in the same order. Do not skip particles or numbers.',
  '- Meanings are short: one word or a short phrase. Never a sentence, never a list',
  '  of dictionary senses. Give the sense used in THIS passage.',
  '- "ko" is a plain-Korean paraphrase, not a translation.',
  '- Uzbek must read like a native wrote it, not like machine translation.',
  '- pos and grammar must come from the allowed lists. If nothing fits, use "other"',
  '  and an empty grammar array rather than inventing a value.',
].join('\n');

async function main() {
  const args = parseArgs();
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY 가 없다. .env 를 확인해라.');
    process.exit(1);
  }
  const client = new Anthropic({ apiKey });

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  const lessonModel = app.get<Model<ReadingLessonDocument>>(
    getModelToken(ReadingLesson.name),
  );

  try {
    const filter: Record<string, unknown> = { isActive: true };
    if (args.level) filter.level = args.level;

    let lessons = await lessonModel
      .find(filter)
      .select('code level passage glossary')
      .sort({ level: 1, order: 1, unit: 1 })
      .lean();

    if (!args.force) {
      lessons = lessons.filter((lesson) => !(lesson.glossary?.length ?? 0));
    }
    if (args.limit) lessons = lessons.slice(0, args.limit);

    if (!lessons.length) {
      console.log('할 일 없음. (--force 를 주면 이미 있는 것도 다시 만든다)');
      return;
    }

    console.log(
      `📚 ${lessons.length}개 레슨 / 모델 ${MODEL}` +
        `${args.dry ? ' / DRY RUN — DB 는 안 건드린다' : ''}`,
    );

    // 기본형 사전. 지문을 넘나들며 이어진다 — 같은 기본형이 어디서나 같은 뜻을
    // 갖게 하는 장치이자, 이미 만든 걸 다시 안 물어보게 하는 캐시다.
    const lemmaDict = new Map<string, Record<string, string>>();
    const dump: Record<string, unknown>[] = [];
    let totalWords = 0;
    let missing = 0;

    for (const [index, lesson] of lessons.entries()) {
      const passageText = lesson.passage
        .map((p) => p.segments.map((s) => s.text).join(''))
        .join('\n\n');
      const words = [...new Set(readingWords(passageText))];

      process.stdout.write(
        `  [${index + 1}/${lessons.length}] ${lesson.code} (${words.length}단어) ... `,
      );

      const result = await askWithRetry(
        client,
        passageText,
        words,
        lemmaDict,
      );
      if (!result) {
        console.log('실패 — 건너뜀');
        continue;
      }

      for (const entry of result.lemmas) {
        // 먼저 정해진 뜻을 이긴다. 앞 지문에서 쓴 표현을 그대로 유지한다
        if (!lemmaDict.has(entry.lemma)) {
          lemmaDict.set(entry.lemma, {
            ko: entry.ko,
            uz: entry.uz,
            en: entry.en,
            ru: entry.ru,
          });
        }
      }

      // 표면형 쪽으로 펼친다. 앱이 조회를 두 번 하지 않게 하는 비정규화다
      const glossary = result.words
        .map((word) => {
          const meaning = lemmaDict.get(word.lemma);
          if (!meaning) return null;
          return {
            word: word.surface,
            lemma: word.lemma,
            pos: word.pos,
            meaning,
            grammar: word.grammar,
            note: { ko: '', uz: '', en: '', ru: '' },
          };
        })
        .filter(Boolean);

      totalWords += words.length;
      missing += words.length - glossary.length;

      if (args.dry) {
        dump.push({ code: lesson.code, glossary });
      } else {
        await lessonModel.updateOne(
          { code: lesson.code },
          { $set: { glossary } },
        );
      }

      console.log(`${glossary.length}개 저장`);
      await sleep(CALL_GAP_MS);
    }

    console.log(
      `\n✅ 단어 ${totalWords}개 중 ${totalWords - missing}개 처리` +
        ` / 기본형 사전 ${lemmaDict.size}개`,
    );
    if (missing > 0) {
      console.log(
        `⚠️ ${missing}개는 뜻을 못 붙였다. 앱에서 그 단어를 누르면 런타임으로 한 번 채운다.`,
      );
    }

    if (args.dry) {
      const out = path.join(process.cwd(), 'glossary-dry-run.json');
      fs.writeFileSync(out, JSON.stringify(dump, null, 2), 'utf8');
      console.log(`📄 ${out} 에 썼다. 확인하고 --dry 빼고 다시 돌려라.`);
    }
  } finally {
    await app.close();
  }
}

async function askWithRetry(
  client: Anthropic,
  passageText: string,
  words: string[],
  lemmaDict: Map<string, Record<string, string>>,
) {
  for (let attempt = 0; attempt <= MAX_RETRY; attempt++) {
    try {
      return await ask(client, passageText, words, lemmaDict);
    } catch (error: any) {
      if (attempt === MAX_RETRY) {
        console.log(`\n     오류: ${String(error?.message).slice(0, 160)}`);
        return null;
      }
      // 레이트 리밋·일시적 오류는 조금 기다렸다 다시
      await sleep(1500 * (attempt + 1));
    }
  }
  return null;
}

interface GlossResult {
  words: { surface: string; lemma: string; pos: string; grammar: string[] }[];
  lemmas: { lemma: string; ko: string; uz: string; en: string; ru: string }[];
}

async function ask(
  client: Anthropic,
  passageText: string,
  words: string[],
  lemmaDict: Map<string, Record<string, string>>,
): Promise<GlossResult> {
  // 이미 정한 뜻 몇 개를 예시로 보여준다. 새로 만드는 게 아니라 톤을 맞추게
  // 하는 게 목적이라 전부 넣지 않는다 (넣으면 매 호출 프롬프트가 커진다).
  const samples = [...lemmaDict.entries()]
    .slice(0, 24)
    .map(([lemma, m]) => `  ${lemma} = ${m.en} / ${m.uz}`)
    .join('\n');

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    temperature: 0,
    system: SYSTEM,
    tools: [GLOSS_TOOL],
    tool_choice: { type: 'tool', name: 'submit_glossary' },
    messages: [
      {
        role: 'user',
        content: [
          'PASSAGE:',
          passageText,
          '',
          `WORDS (${words.length}, gloss every one, same order):`,
          words.join(' '),
          ...(samples
            ? ['', 'Already-decided meanings — match this tone:', samples]
            : []),
        ].join('\n'),
      },
    ],
  });

  const tool = message.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use',
  );
  if (!tool) throw new Error('tool_use 블록이 없다');
  return sanitize(tool.input as any, words);
}

/**
 * 모델 출력을 그대로 믿지 않는다. 이 값이 그대로 앱 화면에 나간다.
 * 주지 않은 단어를 지어내거나, 목록에 없는 태그를 넣는 경우를 걸러낸다.
 */
export function sanitize(raw: any, requested: string[]): GlossResult {
  const allowed = new Set(requested);
  const text = (v: any) => (typeof v === 'string' ? v.trim().slice(0, 120) : '');

  const seen = new Set<string>();
  const wordEntries = (Array.isArray(raw?.words) ? raw.words : [])
    .filter((w: any) => {
      const surface = text(w?.surface);
      if (!surface || !allowed.has(surface) || seen.has(surface)) return false;
      seen.add(surface);
      return true;
    })
    .map((w: any) => ({
      surface: text(w.surface),
      lemma: text(w.lemma) || text(w.surface),
      pos: (WORD_POS as readonly string[]).includes(w?.pos) ? w.pos : 'other',
      grammar: Array.from(
        new Set<string>(
          (Array.isArray(w?.grammar) ? (w.grammar as unknown[]) : []).filter(
            (tag): tag is string =>
              typeof tag === 'string' &&
              (GRAMMAR_TAGS as readonly string[]).includes(tag),
          ),
        ),
      ).slice(0, 4),
    }));

  const lemmaEntries = (Array.isArray(raw?.lemmas) ? raw.lemmas : [])
    .map((l: any) => ({
      lemma: text(l?.lemma),
      ko: text(l?.ko),
      uz: text(l?.uz),
      en: text(l?.en),
      ru: text(l?.ru),
    }))
    .filter((l: any) => l.lemma && l.uz && l.en);

  return { words: wordEntries, lemmas: lemmaEntries };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 직접 실행할 때만 돈다. 다른 데서 import 해도(테스트 등) 안 돌게.
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ 단어뜻 생성 실패:', error);
    process.exit(1);
  });
}
