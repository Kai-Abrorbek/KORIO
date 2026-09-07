import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
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
 * 합성해 둔 오디오를 들고 있는 시간.
 *
 * 발급 → 재생까지만 살아 있으면 된다. 대화가 이어지면서 계속 새 문장이
 * 들어오므로 오래 들고 있을 이유가 없다.
 */
const AUDIO_TTL_MS = 120_000;
/** 메모리 상한. 넘으면 오래된 것부터 버린다 */
const AUDIO_MAX_ENTRIES = 64;

interface CachedAudio {
  audio: Buffer;
  contentType: string;
  expiresAt: number;
}

/**
 * 튜터의 목소리와 우즈벡어 도움말.
 *
 * Realtime 이 텍스트만 만들고, 소리는 여기서 난다. 앱은 업체를 모르고
 * 키도 모른다 — 문장과 선생님 id 만 보낸다.
 */
@Injectable()
export class TutorSpeechService {
  private readonly logger = new Logger(TutorSpeechService.name);

  /**
   * 합성된 오디오를 잠깐 들고 있는 곳.
   *
   * 왜 스트리밍으로 바로 흘려보내지 않는가: 안드로이드의 오디오 프리로더는
   * Content-Length 가 없으면 전체를 메모리에 담지 못하고 **소리 없이 실패**한다
   * (기존 /tts/speech 에서 이미 겪은 문제다). 그래서 문장 하나를 다 합성한 뒤
   * 길이를 붙여서 준다.
   *
   * 지연은 문장 단위로 자르는 것으로 잡는다 — 답변 전체를 기다리지 않고 첫
   * 문장이 끝나는 즉시 합성이 시작되므로, 한 문장(짧다) 합성 시간만 기다린다.
   */
  private readonly audioCache = new Map<string, CachedAudio>();

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

    const audio = await collect(out.body);
    const audioId = crypto.randomBytes(16).toString('hex');
    this.prune();
    this.audioCache.set(audioId, {
      audio,
      contentType: out.contentType,
      expiresAt: Date.now() + AUDIO_TTL_MS,
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

    return { audioId, bytes: audio.length, provider: out.provider };
  }

  /**
   * 재생용. audioId 는 인증된 speak() 에서만 나오는 임시 난수라 이 GET 은
   * 열어둔다 — 플레이어가 URL 을 재생할 때 헤더를 못 붙이기 때문이다.
   */
  takeAudio(audioId: string): CachedAudio {
    const hit = this.audioCache.get(audioId);
    if (!hit || hit.expiresAt <= Date.now()) {
      this.audioCache.delete(audioId);
      throw new NotFoundException('TUTOR_AUDIO_EXPIRED');
    }
    return hit;
  }

  private prune() {
    const now = Date.now();
    for (const [id, v] of this.audioCache) {
      if (v.expiresAt <= now) this.audioCache.delete(id);
    }
    while (this.audioCache.size >= AUDIO_MAX_ENTRIES) {
      const oldest = this.audioCache.keys().next().value;
      if (oldest === undefined) break;
      this.audioCache.delete(oldest);
    }
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

/** 스트림을 한 덩어리로 모은다. 길이를 붙여 보내야 안드로이드가 재생한다 */
async function collect(stream: NodeJS.ReadableStream): Promise<Buffer> {
  const parts: Buffer[] = [];
  for await (const chunk of stream) {
    parts.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as any));
  }
  return Buffer.concat(parts);
}
