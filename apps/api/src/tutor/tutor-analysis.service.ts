import { Injectable, Logger } from '@nestjs/common';
import {
  ANALYSIS_MODEL,
  ANALYSIS_TIMEOUT_MS,
  MAX_TRANSCRIPT_CHARS,
  MAX_TRANSCRIPT_TURN_CHARS,
  MAX_TRANSCRIPT_TURNS,
  MISTAKE_TYPES,
  MIN_ANALYZE_SEC,
  type MistakeType,
} from './tutor.const';
import type { TutorSessionDocument } from './schemas/tutor-session.schema';

const OPENAI_API = 'https://api.openai.com/v1';

export interface TranscriptTurn {
  role: 'user' | 'tutor';
  text: string;
}

export interface SessionMistake {
  original: string;
  corrected: string;
  type: MistakeType;
  note?: string;
}

export interface SessionSummary {
  summary: string;
  mistakes: SessionMistake[];
  newVocabulary: string[];
  goodExpressions: string[];
  grammarPoints: string[];
  spokenTurns: number;
  durationSec: number;
}

const LANG_NAME: Record<string, string> = {
  uz: 'Uzbek',
  ru: 'Russian',
  en: 'English',
  ko: 'Korean',
};

/**
 * 구조화 출력 스키마.
 *
 * strict 모드 규칙:
 *  - 모든 키가 required 여야 하고 additionalProperties 를 막아야 한다.
 *    그래야 "가끔 필드가 빠진 JSON" 을 방어 코드로 처리할 일이 없다.
 *  - ⚠️ maxItems / maxLength 는 **지원하지 않는다.** 넣으면 스키마 자체가
 *    400 으로 거부돼서 요약이 조용히 안 나온다. 개수 제한은 프롬프트로
 *    부탁하고, 실제 상한은 sanitize() 에서 자른다.
 */
const RESULT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'summary',
    'mistakes',
    'newVocabulary',
    'goodExpressions',
    'grammarPoints',
  ],
  properties: {
    summary: {
      type: 'string',
      description: "One short sentence about what they practiced today.",
    },
    mistakes: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['original', 'corrected', 'type', 'note'],
        properties: {
          original: { type: 'string', description: 'What the learner said.' },
          corrected: { type: 'string', description: 'The natural Korean.' },
          type: { type: 'string', enum: [...MISTAKE_TYPES] },
          note: {
            type: 'string',
            description: "One short clause explaining why, in the learner's language.",
          },
        },
      },
    },
    newVocabulary: {
      type: 'array',
      items: { type: 'string' },
      description: 'Korean words or expressions worth reusing next time.',
    },
    goodExpressions: {
      type: 'array',
      items: { type: 'string' },
      description: 'Korean the learner actually said well.',
    },
    grammarPoints: {
      type: 'array',
      items: { type: 'string' },
      description: 'Grammar patterns that came up, as Korean labels like -아서.',
    },
  },
} as const;

/**
 * 대화가 끝난 뒤 요약을 뽑는다.
 *
 * 이게 있어야 튜터가 "매번 처음 만나는 사람" 을 벗어난다. 여기서 남긴 기록이
 * 다음 세션 프롬프트로 들어가고(개인화), 종료 화면 카드가 된다.
 *
 * ⚠️ 실패해도 절대 위로 던지지 않는다. 요약은 부가 기능이고, 이것 때문에
 * 세션 종료(=쿼터 정산)가 실패하면 훨씬 큰 문제다.
 */
@Injectable()
export class TutorAnalysisService {
  private readonly logger = new Logger(TutorAnalysisService.name);

  async analyze(
    session: TutorSessionDocument,
    rawTranscript: TranscriptTurn[],
    lang: string,
  ): Promise<SessionSummary | null> {
    // 같은 세션을 두 번 돌리지 않는다 — 앱이 종료 보고를 재시도할 수 있다
    if (session.analyzed) return null;

    const spokenTurns = rawTranscript.filter((t) => t.role === 'user').length;
    if (session.durationSec < MIN_ANALYZE_SEC || spokenTurns < 2) {
      // 재료가 없다. 호출 자체를 안 하고 표시만 남긴다
      session.analyzed = true;
      session.spokenTurns = spokenTurns;
      await session.save().catch(() => undefined);
      return null;
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return null;

    const transcript = this.trim(rawTranscript);
    const result = await this.ask(apiKey, transcript, lang);

    // 실패했어도 analyzed 를 세운다. 안 그러면 매번 재시도하면서 돈만 나간다
    session.analyzed = true;
    session.spokenTurns = spokenTurns;

    if (!result) {
      await session.save().catch(() => undefined);
      return null;
    }

    session.summary = result.summary;
    session.summaryLang = lang;
    session.mistakes = result.mistakes;
    session.newVocabulary = result.newVocabulary;
    session.goodExpressions = result.goodExpressions;
    session.grammarPoints = result.grammarPoints;
    await session.save().catch((e) => {
      this.logger.warn(`세션 분석 저장 실패: ${e?.message}`);
    });

    return {
      ...result,
      spokenTurns,
      durationSec: session.durationSec,
    };
  }

  /**
   * 클라가 보낸 대화를 자른다.
   *
   * 뒤쪽이 더 쓸모 있다 — 대화 후반에 표현이 붙는다. 그래서 앞을 버린다.
   */
  private trim(turns: TranscriptTurn[]): TranscriptTurn[] {
    const recent = turns
      .filter((t) => t?.text && t.text.trim().length > 0)
      .slice(-MAX_TRANSCRIPT_TURNS);

    const kept: TranscriptTurn[] = [];
    let chars = 0;
    for (let i = recent.length - 1; i >= 0; i--) {
      const text = recent[i].text.trim().slice(0, MAX_TRANSCRIPT_TURN_CHARS);
      if (chars + text.length > MAX_TRANSCRIPT_CHARS) break;
      chars += text.length;
      kept.unshift({ role: recent[i].role, text });
    }
    return kept;
  }

  private async ask(
    apiKey: string,
    transcript: TranscriptTurn[],
    lang: string,
  ): Promise<Omit<SessionSummary, 'spokenTurns' | 'durationSec'> | null> {
    const nativeName = LANG_NAME[lang] ?? 'Uzbek';
    const body = transcript
      .map((t) => `${t.role === 'user' ? 'LEARNER' : 'TUTOR'}: ${t.text}`)
      .join('\n');

    const system = [
      'You review a Korean speaking-practice conversation between a tutor and a learner.',
      'Report ONLY on the LEARNER lines. Never correct the TUTOR.',
      '',
      'Rules:',
      `- Write "summary" and every "note" in ${nativeName}. Keep Korean words in Korean.`,
      '- A mistake is something a Korean speaker would not say. Do NOT flag',
      '  speech-recognition noise, cut-off words, or a merely simple-but-correct sentence.',
      '- If you are not sure it is wrong, leave it out. An empty mistakes list is a fine answer.',
      '- At most 3 mistakes unless there are clearly more. Pick the ones worth fixing first.',
      '- "newVocabulary": Korean expressions from this conversation worth reusing next time.',
      '  Dictionary form, no particles attached. Skip 안녕하세요-level basics.',
      '- "goodExpressions": Korean the learner said well. Leave empty rather than inventing praise.',
      '- "grammarPoints": short Korean labels like "-아서", "-고 싶다". Not sentences.',
      '',
      'Hard limits: at most 5 mistakes, 8 newVocabulary, 3 goodExpressions, 4 grammarPoints.',
    ].join('\n');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ANALYSIS_TIMEOUT_MS);

    try {
      const res = await fetch(`${OPENAI_API}/chat/completions`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: ANALYSIS_MODEL,
          temperature: 0.2,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: body },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'tutor_session_review',
              strict: true,
              schema: RESULT_SCHEMA,
            },
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        this.logger.warn(
          `세션 분석 실패 ${res.status}: ${text.slice(0, 200)}`,
        );
        return null;
      }

      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = data.choices?.[0]?.message?.content;
      if (!content) return null;

      return this.sanitize(JSON.parse(content));
    } catch (e: any) {
      // abort 도 여기로 온다. 요약이 늦으면 그냥 포기한다
      this.logger.warn(`세션 분석 중단: ${e?.message ?? e}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * 모델 출력을 그대로 믿지 않는다.
   *
   * strict 스키마가 모양은 보장하지만 길이·중복·빈 문자열까지 막지는 않는다.
   * 이 값들이 다음 세션 프롬프트로 다시 들어가기 때문에 여기서 정리해둔다.
   */
  private sanitize(
    raw: any,
  ): Omit<SessionSummary, 'spokenTurns' | 'durationSec'> {
    const list = (v: any, max: number, maxLen = 40) =>
      Array.from(
        new Set(
          (Array.isArray(v) ? v : [])
            .filter((s): s is string => typeof s === 'string')
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => s.slice(0, maxLen)),
        ),
      ).slice(0, max);

    const mistakes: SessionMistake[] = (
      Array.isArray(raw?.mistakes) ? raw.mistakes : []
    )
      .filter(
        (m: any) =>
          typeof m?.original === 'string' &&
          typeof m?.corrected === 'string' &&
          m.original.trim() &&
          m.corrected.trim() &&
          // 같은 문장을 "고쳤다"고 내놓는 경우가 있다. 보여줄 게 없다
          m.original.trim() !== m.corrected.trim(),
      )
      .slice(0, 5)
      .map((m: any) => ({
        original: String(m.original).trim().slice(0, 200),
        corrected: String(m.corrected).trim().slice(0, 200),
        type: (MISTAKE_TYPES as readonly string[]).includes(m?.type)
          ? (m.type as MistakeType)
          : 'other',
        note:
          typeof m?.note === 'string' && m.note.trim()
            ? m.note.trim().slice(0, 200)
            : undefined,
      }));

    return {
      summary:
        typeof raw?.summary === 'string' ? raw.summary.trim().slice(0, 300) : '',
      mistakes,
      newVocabulary: list(raw?.newVocabulary, 8),
      goodExpressions: list(raw?.goodExpressions, 3, 80),
      grammarPoints: list(raw?.grammarPoints, 4, 30),
    };
  }
}
