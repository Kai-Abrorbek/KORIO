import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  EXPLAIN_MODEL,
  MAX_EXPLAIN_CHARS,
  MAX_TTS_TEXT_CHARS,
} from './tutor.const';
import { resolveTeacher } from './teachers/tutor-teachers';
import { TutorTtsRegistry } from './tts/tutor-tts.registry';
import type { TutorTtsLanguage } from './tts/tutor-tts.types';
import {
  TutorSession,
  TutorSessionDocument,
} from './schemas/tutor-session.schema';

const OPENAI_API = 'https://api.openai.com/v1';
const EXPLAIN_TIMEOUT_MS = 12000;

/**
 * 튜터의 목소리와 우즈벡어 도움말.
 *
 * Realtime 이 텍스트만 만들고, 소리는 여기서 난다. 앱은 업체를 모르고
 * 키도 모른다 — 문장과 선생님 id 만 보낸다.
 */
@Injectable()
export class TutorSpeechService {
  private readonly logger = new Logger(TutorSpeechService.name);

  constructor(
    private readonly registry: TutorTtsRegistry,
    @InjectModel(TutorSession.name)
    private readonly sessionModel: Model<TutorSessionDocument>,
  ) {}

  /**
   * 문장 하나를 선생님 목소리로 읽는다.
   *
   * ⚠️ text 는 앱이 보낸 값이다. 길이를 반드시 서버에서 자른다 — 안 자르면
   *    이 엔드포인트가 우리 키로 아무 글이나 읽어주는 공개 TTS 가 된다.
   *    (요청 횟수는 컨트롤러의 RateLimit 가 따로 막는다)
   */
  async speak(params: {
    text: string;
    teacherId?: string;
    language?: string;
    sessionId?: string;
  }) {
    const text = (params.text ?? '').trim();
    if (!text) throw new BadRequestException('EMPTY_TEXT');
    if (text.length > MAX_TTS_TEXT_CHARS) {
      throw new BadRequestException('TEXT_TOO_LONG');
    }

    const teacher = resolveTeacher(params.teacherId);
    const language: TutorTtsLanguage = params.language === 'uz' ? 'uz' : 'ko';

    const out = await this.registry.synthesize(teacher.tts.provider, {
      text,
      voiceId: teacher.tts.voiceId,
      speed: teacher.speechRate,
      language,
    });

    // 과금 근거. 실패해도 소리는 이미 나가고 있으니 붙잡지 않는다
    if (params.sessionId && Types.ObjectId.isValid(params.sessionId)) {
      void this.sessionModel
        .updateOne(
          { _id: new Types.ObjectId(params.sessionId) },
          {
            $inc: { ttsCharacters: out.characters },
            // 폴백이 돌았으면 실제로 소리를 낸 업체로 정정한다
            $set: { ttsProvider: out.provider },
          },
        )
        .catch(() => undefined);
    }

    return out;
  }

  /**
   * 튜터가 방금 한 한국어 한 줄을 학습자 언어로 풀어준다.
   *
   * 매 턴 미리 만들어두지 않는다 — 대부분은 아무도 안 누르고, 그만큼은 그냥
   * 버리는 돈이다. 눌렀을 때만 만든다.
   */
  async explain(text: string, lang = 'uz') {
    const clean = (text ?? '').trim().slice(0, MAX_EXPLAIN_CHARS);
    if (!clean) throw new BadRequestException('EMPTY_TEXT');

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) return { translation: '', explanation: null };

    const target =
      { uz: 'Uzbek', ru: 'Russian', en: 'English', ko: 'Korean' }[lang] ??
      'Uzbek';

    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), EXPLAIN_TIMEOUT_MS);
    try {
      const res = await fetch(`${OPENAI_API}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: EXPLAIN_MODEL,
          temperature: 0.2,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: [
                `You help a Korean learner whose native language is ${target}.`,
                `You are given one line the Korean teacher just said.`,
                `Return JSON: {"translation": string, "explanation": string|null}`,
                `- translation: natural ${target}, what the line means.`,
                `- explanation: ONE short ${target} note about the grammar or`,
                `  expression, only if it genuinely helps. Otherwise null.`,
                `Never add anything else.`,
              ].join('\n'),
            },
            { role: 'user', content: clean },
          ],
        }),
        signal: ac.signal,
      });

      if (!res.ok) {
        this.logger.warn(`설명 생성 실패 ${res.status}`);
        return { translation: '', explanation: null };
      }
      const data: any = await res.json();
      const parsed = JSON.parse(data?.choices?.[0]?.message?.content ?? '{}');
      return {
        translation: String(parsed.translation ?? ''),
        explanation: parsed.explanation ? String(parsed.explanation) : null,
      };
    } catch (e: any) {
      this.logger.warn(`설명 생성 오류: ${e?.message ?? e}`);
      // 실패해도 화면은 그대로 둔다. 도움말은 없어도 대화는 이어진다
      return { translation: '', explanation: null };
    } finally {
      clearTimeout(timer);
    }
  }
}
