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
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { Question, QuestionDocument } from '../lessons/schemas/question.schema';
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

interface ResolvedWord {
  Word?: string;
  PronunciationAssessment?: { AccuracyScore?: number; ErrorType?: string };
}

interface RecognizeOutcome {
  status: SpeechStatus;
  text: string;
  /** 참조 문장을 준 경우에만 채워진다 */
  scores: SpeechScores | null;
  words: ResolvedWord[];
  /** 취소된 경우 사유 (로그용) */
  cancelReason?: string;
}

interface ResultItem {
  characterId: string;
  correct: boolean;
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
    const stats = this.audioStats(wav);

    const outcome = await this.recognize(wav, referenceText);
    const scores: SpeechScores = outcome.scores ?? {
      pron: 0,
      accuracy: 0,
      fluency: 0,
      completeness: 0,
      prosody: null,
    };

    const words: AssessedWord[] = outcome.words.map((w) => ({
      word: w.Word ?? '',
      accuracy: this.num(w.PronunciationAssessment?.AccuracyScore),
      errorType: (w.PronunciationAssessment?.ErrorType ??
        'None') as WordErrorType,
    }));

    const summary =
      `audio=${stats.seconds}s peak=${stats.peakPct}% rms=${stats.rms} ` +
      `ref="${referenceText}" heard="${outcome.text}" ` +
      `pron=${scores.pron} acc=${scores.accuracy} comp=${scores.completeness}`;

    if (outcome.status !== 'success' || scores.pron === 0) {
      // 점수가 0 이면 원인이 오디오인지 Azure 응답인지 봐야 한다.
      // peak 이 5% 미만이면 사실상 무음 → 녹음 쪽 문제.
      const dumped = this.dumpAudio(wav);
      this.logger.warn(
        `발음 평가 이상: status=${outcome.status} ${summary}` +
          `${outcome.cancelReason ? ` cancel=${outcome.cancelReason}` : ''}\n` +
          `녹음파일=${dumped}`,
      );
    } else {
      this.logger.log(`발음 평가: ${summary}`);
    }

    const passed =
      outcome.status === 'success' &&
      scores.pron >= threshold.pron &&
      scores.completeness >= threshold.completeness;

    return {
      status: outcome.status,
      passed,
      transcript: outcome.text,
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

    const stats = this.audioStats(wav);
    const outcome = await this.recognize(wav);
    this.logger.log(
      `받아쓰기: audio=${stats.seconds}s peak=${stats.peakPct}% ` +
        `rms=${stats.rms} text="${outcome.text}"`,
    );

    return { status: outcome.status, text: outcome.text };
  }

  // ── Azure ─────────────────────────────────────────────

  /**
   * Speech SDK 로 인식한다.
   *
   * short-audio REST 로도 같은 일을 할 수 있어야 하는데, 이 리소스에서는
   * Pronunciation-Assessment 헤더를 받아 base64 파싱까지 하면서도
   * (패딩을 깨면 400 이 난다) 응답에 PronunciationAssessment 블록을 넣어주지
   * 않는다. 같은 오디오·같은 키·같은 리전으로 SDK 는 정상 동작하므로
   * SDK 를 쓴다. scripts/azure-pa-matrix.mjs 로 재현 가능.
   */
  private recognize(
    wav: Buffer,
    referenceText?: string,
  ): Promise<RecognizeOutcome> {
    const speechConfig = this.buildSpeechConfig();
    const audioConfig = sdk.AudioConfig.fromWavFileInput(wav);
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    if (referenceText) {
      const paConfig = new sdk.PronunciationAssessmentConfig(
        referenceText,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Word,
        // enableMiscue: 참조에 없는 말을 삽입/누락으로 잡을지. 학습자 발화에는
        // 과하게 엄격해서 끈다 (completeness 로 이미 누락을 본다).
        false,
      );
      paConfig.applyTo(recognizer);
    }

    return new Promise<RecognizeOutcome>((resolve, reject) => {
      let settled = false;
      const done = (fn: () => void) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        try {
          recognizer.close();
        } catch {
          // 이미 닫힘
        }
        try {
          speechConfig.close();
        } catch {
          // 이미 닫힘
        }
        fn();
      };

      const timer = setTimeout(
        () =>
          done(() =>
            reject(new ServiceUnavailableException('AZURE_SPEECH_TIMEOUT')),
          ),
        AZURE_TIMEOUT_MS,
      );

      recognizer.recognizeOnceAsync(
        (result) => {
          // close() 이전에 필요한 값을 전부 꺼내둔다
          let outcome: RecognizeOutcome;
          try {
            outcome = this.mapResult(result, !!referenceText);
          } catch (error) {
            const message =
              error instanceof Error ? error.message : String(error);
            done(() => reject(new BadGatewayException('AZURE_SPEECH_FAILED')));
            this.logger.error(`인식 결과 해석 실패: ${message}`);
            return;
          }
          done(() => resolve(outcome));
        },
        (error) => {
          this.logger.error(`Azure STT 실패: ${error}`);
          done(() => reject(new BadGatewayException('AZURE_SPEECH_FAILED')));
        },
      );
    });
  }

  private mapResult(
    result: sdk.SpeechRecognitionResult,
    withAssessment: boolean,
  ): RecognizeOutcome {
    if (result.reason === sdk.ResultReason.NoMatch) {
      return { status: 'no_speech', text: '', scores: null, words: [] };
    }

    if (result.reason === sdk.ResultReason.Canceled) {
      const details = sdk.CancellationDetails.fromResult(result);
      return {
        status: 'error',
        text: '',
        scores: null,
        words: [],
        cancelReason: `${sdk.CancellationReason[details.reason]} ${details.errorDetails ?? ''}`.trim(),
      };
    }

    if (result.reason !== sdk.ResultReason.RecognizedSpeech) {
      return { status: 'error', text: result.text ?? '', scores: null, words: [] };
    }

    if (!withAssessment) {
      return {
        status: 'success',
        text: result.text ?? '',
        scores: null,
        words: [],
      };
    }

    const pa = sdk.PronunciationAssessmentResult.fromResult(result);
    const detail = pa.detailResult as unknown as { Words?: ResolvedWord[] };

    return {
      status: 'success',
      text: result.text ?? '',
      scores: {
        pron: this.num(pa.pronunciationScore),
        accuracy: this.num(pa.accuracyScore),
        fluency: this.num(pa.fluencyScore),
        completeness: this.num(pa.completenessScore),
        // 운율 평가는 ko-KR 미지원이라 보통 비어 있다
        prosody: Number.isFinite(pa.prosodyScore)
          ? Math.round(pa.prosodyScore)
          : null,
      },
      words: detail?.Words ?? [],
    };
  }

  private buildSpeechConfig(): sdk.SpeechConfig {
    const key = this.configService.get<string>('AZURE_SPEECH_KEY')?.trim();
    const region = this.configService.get<string>('AZURE_SPEECH_REGION')?.trim();
    const endpoint = this.configService
      .get<string>('AZURE_SPEECH_ENDPOINT')
      ?.trim();

    if (!key) {
      throw new ServiceUnavailableException('AZURE_SPEECH_NOT_CONFIGURED');
    }

    let config: sdk.SpeechConfig;
    if (region) {
      config = sdk.SpeechConfig.fromSubscription(key, region);
    } else if (endpoint) {
      try {
        config = sdk.SpeechConfig.fromEndpoint(new URL(endpoint), key);
      } catch {
        throw new ServiceUnavailableException('AZURE_SPEECH_ENDPOINT_INVALID');
      }
    } else {
      throw new ServiceUnavailableException('AZURE_SPEECH_NOT_CONFIGURED');
    }

    config.speechRecognitionLanguage = SPEECH_LANGUAGE;
    return config;
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

  /** 0 점이 났을 때 실제 녹음을 파일로 남긴다. 들어보면 원인이 바로 잡힌다. */
  private dumpAudio(wav: Buffer): string {
    try {
      const dir = path.resolve(process.cwd(), '.speech-debug');
      fs.mkdirSync(dir, { recursive: true });
      const file = path.join(dir, `${Date.now()}.wav`);
      fs.writeFileSync(file, wav);

      // 최근 20개만 남긴다
      const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.wav'))
        .sort();
      for (const old of files.slice(0, Math.max(0, files.length - 20))) {
        fs.unlinkSync(path.join(dir, old));
      }
      return file;
    } catch {
      return '(저장 실패)';
    }
  }

  /**
   * WAV PCM 파형 통계. 0 점이 나왔을 때 "마이크가 무음을 녹음했나"와
   * "Azure 가 못 알아들었나"를 구분하는 유일한 방법이다.
   */
  private audioStats(wav: Buffer) {
    let peak = 0;
    let sumSquares = 0;
    let count = 0;
    for (let i = 44; i + 1 < wav.length; i += 2) {
      const v = wav.readInt16LE(i);
      const abs = v < 0 ? -v : v;
      if (abs > peak) peak = abs;
      sumSquares += v * v;
      count++;
    }
    return {
      seconds: (count / SPEECH_SAMPLE_RATE).toFixed(2),
      peak,
      peakPct: Math.round((peak / 32767) * 100),
      rms: count ? Math.round(Math.sqrt(sumSquares / count)) : 0,
    };
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
