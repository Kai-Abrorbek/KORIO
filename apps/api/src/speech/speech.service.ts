import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Question,
  QuestionDocument,
} from '../lessons/schemas/question.schema';
import { Lesson, LessonDocument } from '../lessons/schemas/lesson.schema';
import {
  AZURE_TIMEOUT_MS,
  SPEECH_BITS_PER_SAMPLE,
  SPEECH_CHANNELS,
  SPEECH_LANGUAGE,
  SPEECH_MAX_BYTES,
  SPEECH_MIN_SECONDS,
  SPEECH_RATE_LIMIT,
  SPEECH_SAMPLE_RATE,
  thresholdForSection,
} from './speech.constants';
import {
  AssessResult,
  AssessedWord,
  SpeechScores,
  SpeechStatus,
  TranscribeResult,
  WordErrorType,
} from './speech.types';

/** Azure short-audio REST 응답 중 우리가 쓰는 부분만 */
interface AzurePronunciation {
  AccuracyScore?: number;
  FluencyScore?: number;
  CompletenessScore?: number;
  PronScore?: number;
  ProsodyScore?: number;
  ErrorType?: string;
}
interface AzureWord {
  Word?: string;
  PronunciationAssessment?: AzurePronunciation;
}
interface AzureNBest {
  Display?: string;
  Lexical?: string;
  PronunciationAssessment?: AzurePronunciation;
  Words?: AzureWord[];
}
interface AzureSttResponse {
  RecognitionStatus?: string;
  DisplayText?: string;
  NBest?: AzureNBest[];
}

@Injectable()
export class SpeechService {
  private readonly logger = new Logger(SpeechService.name);
  /** userId -> 최근 호출 시각들 (슬라이딩 윈도우) */
  private readonly calls = new Map<string, number[]>();

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,
  ) {}

  /** Speaking 문제: 참조 문장 대비 발음 평가 */
  async assess(
    userId: string,
    questionId: string,
    wav: Buffer,
  ): Promise<AssessResult> {
    this.consumeRateLimit(userId);
    this.validateWav(wav);

    const { referenceText, section } = await this.resolveQuestion(questionId);
    const threshold = thresholdForSection(section);

    const params = {
      ReferenceText: referenceText,
      GradingSystem: 'HundredMark',
      Granularity: 'Word',
      Dimension: 'Comprehensive',
      EnableProsodyAssessment: 'True',
    };
    const body = await this.callAzure(wav, {
      'Pronunciation-Assessment': Buffer.from(
        JSON.stringify(params),
        'utf8',
      ).toString('base64'),
    });

    const status = this.mapStatus(body.RecognitionStatus);
    const best = body.NBest?.[0];
    const pa = best?.PronunciationAssessment ?? {};

    const scores: SpeechScores = {
      pron: this.num(pa.PronScore),
      accuracy: this.num(pa.AccuracyScore),
      fluency: this.num(pa.FluencyScore),
      completeness: this.num(pa.CompletenessScore),
      prosody:
        typeof pa.ProsodyScore === 'number' ? Math.round(pa.ProsodyScore) : null,
    };

    const words: AssessedWord[] = (best?.Words ?? []).map((w) => ({
      word: w.Word ?? '',
      accuracy: this.num(w.PronunciationAssessment?.AccuracyScore),
      errorType: (w.PronunciationAssessment?.ErrorType ??
        'None') as WordErrorType,
    }));

    const passed =
      status === 'success' &&
      scores.pron >= threshold.pron &&
      scores.completeness >= threshold.completeness;

    return {
      status,
      passed,
      transcript: body.DisplayText ?? best?.Display ?? '',
      referenceText,
      scores,
      words,
      threshold: {
        tier: threshold.tier,
        pron: threshold.pron,
        completeness: threshold.completeness,
      },
    };
  }

  /** TranslateType 마이크: 참조 문장 없이 그냥 받아쓰기 */
  async transcribe(userId: string, wav: Buffer): Promise<TranscribeResult> {
    this.consumeRateLimit(userId);
    this.validateWav(wav);

    const body = await this.callAzure(wav);
    return {
      status: this.mapStatus(body.RecognitionStatus),
      text: body.DisplayText ?? body.NBest?.[0]?.Display ?? '',
    };
  }

  // ── 내부 ──────────────────────────────────────────────

  /**
   * 참조 문장은 클라이언트가 보내지 않는다. 보내게 하면 "정답을 참조로 넣고
   * 아무 말이나 하기" 가 되므로 questionId 로 서버가 조회한다.
   */
  private async resolveQuestion(questionId: string) {
    if (!Types.ObjectId.isValid(questionId)) {
      throw new BadRequestException('INVALID_QUESTION_ID');
    }
    const qid = new Types.ObjectId(questionId);

    const question = await this.questionModel
      .findById(qid)
      .select('answer audioText type')
      .lean();
    if (!question) throw new NotFoundException('QUESTION_NOT_FOUND');

    const referenceText = (question.answer || question.audioText || '').trim();
    if (!referenceText) {
      throw new BadRequestException('QUESTION_HAS_NO_REFERENCE_TEXT');
    }

    // 레벨 테스트/복습처럼 레슨에 안 묶인 문제도 있어서 없으면 가장 관대한 기준으로 떨어진다
    const lesson = await this.lessonModel
      .findOne({ questionIds: qid })
      .select('section')
      .lean();

    return { referenceText, section: lesson?.section };
  }

  /** 16kHz/모노/16bit PCM WAV 인지 확인. 아니면 Azure 가 어차피 거절한다. */
  private validateWav(wav: Buffer) {
    if (!wav?.length) throw new BadRequestException('EMPTY_AUDIO');
    if (wav.length > SPEECH_MAX_BYTES) {
      throw new BadRequestException('AUDIO_TOO_LONG');
    }
    if (
      wav.length < 44 ||
      wav.toString('ascii', 0, 4) !== 'RIFF' ||
      wav.toString('ascii', 8, 12) !== 'WAVE'
    ) {
      throw new BadRequestException('AUDIO_NOT_WAV');
    }

    const audioFormat = wav.readUInt16LE(20);
    const channels = wav.readUInt16LE(22);
    const sampleRate = wav.readUInt32LE(24);
    const bits = wav.readUInt16LE(34);

    if (
      audioFormat !== 1 ||
      channels !== SPEECH_CHANNELS ||
      sampleRate !== SPEECH_SAMPLE_RATE ||
      bits !== SPEECH_BITS_PER_SAMPLE
    ) {
      throw new BadRequestException('AUDIO_FORMAT_UNSUPPORTED');
    }

    const bytesPerSecond =
      SPEECH_SAMPLE_RATE * SPEECH_CHANNELS * (SPEECH_BITS_PER_SAMPLE / 8);
    if ((wav.length - 44) / bytesPerSecond < SPEECH_MIN_SECONDS) {
      throw new BadRequestException('AUDIO_TOO_SHORT');
    }
  }

  private async callAzure(
    wav: Buffer,
    extraHeaders: Record<string, string> = {},
  ): Promise<AzureSttResponse> {
    const subscriptionKey = this.configService
      .get<string>('AZURE_SPEECH_KEY')
      ?.trim();
    if (!subscriptionKey) {
      throw new ServiceUnavailableException('AZURE_SPEECH_NOT_CONFIGURED');
    }

    const url = `${this.resolveEndpoint()}?language=${SPEECH_LANGUAGE}&format=detailed`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), AZURE_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': `audio/wav; codecs=audio/pcm; samplerate=${SPEECH_SAMPLE_RATE}`,
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'User-Agent': 'Korio',
          ...extraHeaders,
        },
        body: new Uint8Array(wav),
        signal: controller.signal,
      });

      if (!response.ok) {
        this.logger.error(`Azure STT failed (${response.status})`);
        throw new BadGatewayException('AZURE_SPEECH_FAILED');
      }

      return (await response.json()) as AzureSttResponse;
    } catch (error) {
      if (
        error instanceof BadGatewayException ||
        error instanceof ServiceUnavailableException
      ) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ServiceUnavailableException('AZURE_SPEECH_TIMEOUT');
      }
      this.logger.error('Azure STT request could not be completed');
      throw new BadGatewayException('AZURE_SPEECH_FAILED');
    } finally {
      clearTimeout(timeout);
    }
  }

  /** TTS 와 같은 env 를 쓰되 호스트만 stt 로 바꾼다 */
  private resolveEndpoint(): string {
    const region = this.configService
      .get<string>('AZURE_SPEECH_REGION')
      ?.trim();
    const configured = this.configService
      .get<string>('AZURE_SPEECH_ENDPOINT')
      ?.trim();
    const path = '/speech/recognition/conversation/cognitiveservices/v1';

    if (configured) {
      try {
        const url = new URL(configured);
        if (url.pathname.includes('/cognitiveservices/v1')) {
          return url.toString().replace(/\/$/, '');
        }
        // 커스텀 도메인(*.api.cognitive.microsoft.com)은 STT 를 못 받으므로 지역 호스트로 간다
        if (url.hostname.endsWith('.api.cognitive.microsoft.com') && region) {
          return `https://${region}.stt.speech.microsoft.com${path}`;
        }
        url.pathname = `${url.pathname.replace(/\/$/, '')}/stt${path}`;
        return url.toString().replace(/\/$/, '');
      } catch {
        throw new ServiceUnavailableException('AZURE_SPEECH_ENDPOINT_INVALID');
      }
    }

    if (region) return `https://${region}.stt.speech.microsoft.com${path}`;
    throw new ServiceUnavailableException('AZURE_SPEECH_NOT_CONFIGURED');
  }

  private mapStatus(recognitionStatus?: string): SpeechStatus {
    switch (recognitionStatus) {
      case 'Success':
        return 'success';
      case 'NoMatch':
      case 'InitialSilenceTimeout':
      case 'BabbleTimeout':
        return 'no_speech';
      default:
        return 'error';
    }
  }

  private num(value?: number): number {
    return typeof value === 'number' && Number.isFinite(value)
      ? Math.round(value)
      : 0;
  }

  private consumeRateLimit(userId: string) {
    const now = Date.now();
    const since = now - SPEECH_RATE_LIMIT.windowMs;
    const recent = (this.calls.get(userId) ?? []).filter((t) => t > since);

    if (recent.length >= SPEECH_RATE_LIMIT.max) {
      throw new BadRequestException('SPEECH_RATE_LIMITED');
    }

    recent.push(now);
    this.calls.set(userId, recent);

    // 오래된 유저 엔트리 정리 (맵이 무한히 커지지 않게)
    if (this.calls.size > 5000) {
      for (const [key, times] of this.calls) {
        if (!times.some((t) => t > since)) this.calls.delete(key);
      }
    }
  }
}
