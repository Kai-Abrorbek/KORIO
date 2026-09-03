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
import {
  Expression,
  ExpressionDocument,
} from '../expressions/schemas/expression.schema';
import { Question, QuestionDocument } from '../lessons/schemas/question.schema';
import { Lesson, LessonDocument } from '../lessons/schemas/lesson.schema';
import {
  ReadingLesson,
  ReadingLessonDocument,
} from '../reading-lessons/schemas/reading-lesson.schema';
import { ReadingLessonsService } from '../reading-lessons/reading-lessons.service';
import {
  normalizeWord,
  readingWords,
} from '../reading-lessons/reading-words.util';
import {
  AZURE_TIMEOUT_MS,
  SPEECH_BITS_PER_SAMPLE,
  SPEECH_CHANNELS,
  SPEECH_LANGUAGE,
  SPEECH_MAX_BYTES,
  SPEECH_MIN_SECONDS,
  SPEECH_RATE_LIMIT,
  SPEECH_SAMPLE_RATE,
  READING_SHORT_WORD_ACCURACY,
  READING_SHORT_WORD_LENGTH,
  READING_WORD_ACCURACY,
  thresholdForSection,
} from './speech.constants';
import {
  AssessResult,
  AssessedWord,
  ReadingAssessResult,
  ReadingWordResult,
  SpeechScores,
  SpeechStatus,
  TranscribeResult,
  WordErrorType,
} from './speech.types';
import {
  speechTextSimilarity,
  speechTextSimilarityThreshold,
} from './speech-text-match.util';

interface ResolvedWord {
  Word?: string;
  PronunciationAssessment?: { AccuracyScore?: number; ErrorType?: string };
  /**
   * 이 단어가 오디오의 어디에 있었는지. 단위는 100나노초 틱이다.
   *
   * 읽기 연습에서 이게 필요하다: 앱이 마이크를 계속 켜둔 채로 읽게 하려면,
   * "이번에 채점한 데까지의 오디오" 를 정확히 잘라내고 나머지는 다음 요청에
   * 남겨야 한다. 그래야 한 호흡에 참조보다 많이 읽어도 뒷부분이 안 날아간다.
   */
  Offset?: number;
  Duration?: number;
}

/** 100나노초 틱 → 밀리초 */
const TICKS_PER_MS = 10_000;

interface RecognizeOutcome {
  status: SpeechStatus;
  text: string;
  /** 참조 문장을 준 경우에만 채워진다 */
  scores: SpeechScores | null;
  words: ResolvedWord[];
  /** 취소된 경우 사유 (로그용) */
  cancelReason?: string;
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
    @InjectModel(ReadingLesson.name)
    private readonly readingLessonModel: Model<ReadingLessonDocument>,
    @InjectModel(Expression.name)
    private readonly expressionModel: Model<ExpressionDocument>,
    private readonly readingLessons: ReadingLessonsService,
  ) {}

  /** Speaking 문제: 참조 문장 대비 발음 평가 */
  async assess(
    userId: string,
    questionId: string,
    wav: Buffer,
  ): Promise<AssessResult> {
    this.consumeRateLimit(userId);
    this.validateWav(wav);
    const reference = await this.resolveQuestion(questionId);
    return this.assessReference(
      wav,
      reference.referenceText,
      reference.section,
      '발음 평가',
    );
  }

  /** 표현 카드: DB의 한국어 표현을 참조 문장으로 발음 평가 */
  async assessExpression(
    userId: string,
    expressionId: string,
    wav: Buffer,
  ): Promise<AssessResult> {
    this.consumeRateLimit(userId);
    this.validateWav(wav);
    const reference = await this.resolveExpression(expressionId);
    return this.assessReference(
      wav,
      reference.referenceText,
      reference.section,
      '표현 발음 평가',
    );
  }

  private async assessReference(
    wav: Buffer,
    referenceText: string,
    section: number | undefined,
    logLabel: string,
  ): Promise<AssessResult> {
    const threshold = thresholdForSection(section);
    const stats = this.audioStats(wav);

    // Azure의 발음 점수만으로는 다른 문장을 또렷하게 말한 경우를 충분히
    // 걸러내지 못한다. 삽입·누락을 켜고 실제 인식 문장도 별도로 비교한다.
    const outcome = await this.recognize(wav, referenceText, true);
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
    const textSimilarity = speechTextSimilarity(referenceText, outcome.text);
    const textSimilarityBar = speechTextSimilarityThreshold(referenceText);

    const summary =
      `audio=${stats.seconds}s peak=${stats.peakPct}% rms=${stats.rms} ` +
      `ref="${referenceText}" heard="${outcome.text}" ` +
      `pron=${scores.pron} acc=${scores.accuracy} comp=${scores.completeness} ` +
      `textMatch=${textSimilarity}/${textSimilarityBar}`;

    if (outcome.status !== 'success' || scores.pron === 0) {
      // 점수가 0 이면 원인이 오디오인지 Azure 응답인지 봐야 한다.
      // peak 이 5% 미만이면 사실상 무음 → 녹음 쪽 문제.
      const dumped = this.dumpAudio(wav);
      this.logger.warn(
        `${logLabel} 이상: status=${outcome.status} ${summary}` +
          `${outcome.cancelReason ? ` cancel=${outcome.cancelReason}` : ''}\n` +
          `녹음파일=${dumped}`,
      );
    } else {
      this.logger.log(`${logLabel}: ${summary}`);
    }

    // ── 아무 말도 안 한 경우는 오답이 아니다 ──
    //
    // Azure 가 NoMatch 를 주면 위에서 no_speech 로 잡힌다. 그런데 거의 무음이나
    // 잡음만 있어도 RecognizedSpeech 를 주면서 **빈 문장 + 점수 0** 을 돌려줄
    // 때가 있다. 그걸 그대로 내보내면 화면은 status=success/passed=false 를
    // 받아 "틀렸다" 로 처리한다 — 유저는 말을 한 적도 없는데 오답이 된다.
    //
    // 세 신호 중 하나라도 걸리면 "못 들었다" 로 돌려서 다시 말하게 한다.
    //   · 인식된 문장이 비었다
    //   · 발음·완성도 점수가 둘 다 0 (Azure 가 평가할 게 없었다)
    //   · 오디오 피크가 5% 미만 = 사실상 무음 (마이크가 안 잡힌 것)
    // 웅얼거려서 점수가 낮은 건 여기 안 걸린다 — 그건 진짜 시도라 오답이 맞다.
    const heardNothing =
      !outcome.text.trim() ||
      (scores.pron === 0 && scores.completeness === 0) ||
      stats.peakPct < 5;

    const status: SpeechStatus =
      outcome.status === 'success' && heardNothing
        ? 'no_speech'
        : outcome.status;

    const passed =
      status === 'success' &&
      scores.pron >= threshold.pron &&
      scores.completeness >= threshold.completeness &&
      textSimilarity >= textSimilarityBar;

    return {
      status,
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

  /** 읽기 연습: DB 본문에서 현재 구간을 찾아 단어 단위로 발음을 평가한다. */
  async assessReading(
    userId: string,
    lessonCode: string,
    startWordIndex: number,
    wordCount: number,
    wav: Buffer,
  ): Promise<ReadingAssessResult> {
    this.consumeRateLimit(userId);
    this.validateWav(wav);

    const reference = await this.resolveReadingChunk(
      lessonCode,
      startWordIndex,
      wordCount,
    );
    const threshold = thresholdForSection(reference.level);
    const stats = this.audioStats(wav);
    // miscue 를 켜서 부른다 — 이유는 recognize() 안에 적어놨다
    const outcome = await this.recognize(wav, reference.text, true);
    const scores: SpeechScores = outcome.scores ?? {
      pron: 0,
      accuracy: 0,
      fluency: 0,
      completeness: 0,
      prosody: null,
    };
    const words: AssessedWord[] = outcome.words.map((word) => ({
      word: word.Word ?? '',
      accuracy: this.num(word.PronunciationAssessment?.AccuracyScore),
      errorType: (word.PronunciationAssessment?.ErrorType ??
        'None') as WordErrorType,
      endMs:
        word.Offset != null && word.Duration != null
          ? Math.round((word.Offset + word.Duration) / TICKS_PER_MS)
          : null,
    }));

    // Azure 응답을 참조 단어에 맞춘다. 위치로 그냥 믿으면 안 된다 — 자세한
    // 이유는 alignToReference() 주석 참고.
    const aligned = this.alignToReference(reference.words, words);

    const { passedWordCount, failedWordOffset, wordResults } =
      outcome.status === 'success'
        ? this.gradeReadingWords(reference.words, aligned, startWordIndex)
        : this.blankReadingWords(reference.words, startWordIndex);

    // 한 단어도 못 읽었고 틀린 것도 없으면 소리가 안 잡힌 것이다.
    // 성공으로 돌려보내면 화면이 아무 반응 없이 다시 녹음만 반복한다.
    const status: SpeechStatus =
      outcome.status === 'success' &&
      passedWordCount === 0 &&
      failedWordOffset === null
        ? 'no_speech'
        : outcome.status;

    // 이번 오디오에서 채점이 끝난 지점(ms). 앱은 여기까지만 버리고 나머지는
    // 다음 요청에 이어 붙인다 — 한 호흡에 참조보다 많이 읽어도 안 날아간다.
    // 통과한 마지막 단어가 없으면 0 을 준다 (= 아무것도 버리지 말고 다시 보내라).
    const consumedMs = this.consumedMsOf(aligned, passedWordCount);

    const nextWordIndex = startWordIndex + passedWordCount;
    const complete = nextWordIndex >= reference.totalWords;
    const chunkPassed = passedWordCount === reference.words.length;
    const failedWordIndex =
      failedWordOffset === null ? null : startWordIndex + failedWordOffset;

    // 기준을 조정하려면 이 로그의 단어별 실제 점수를 봐야 한다.
    this.logger.log(
      `읽기 발음 평가: lesson=${lessonCode} start=${startWordIndex} ` +
        `passed=${passedWordCount}/${reference.words.length} ` +
        `status=${status} audio=${stats.seconds}s peak=${stats.peakPct}% ` +
        `ref="${reference.text}" heard="${outcome.text}" ` +
        `점수=[${wordResults
          .map((w) => `${w.word}:${w.accuracy ?? '-'}/${w.status}`)
          .join(' ')}] ` +
        `azure=[${words.map((w) => `${w.word}:${w.accuracy}:${w.errorType}`).join(' ')}]`,
    );

    // 낭독 진도는 여기서 남긴다. 클라가 "다 읽었다" 고 보고하는 경로를 만들면
    // 그냥 눌러서 XP 를 받으므로, 서버가 오디오를 채점하면서 직접 본 사실만
    // 기록한다. 진도 기록이 실패해도 채점 응답은 그대로 나간다.
    if (nextWordIndex > startWordIndex || complete) {
      await this.readingLessons.markReadingProgress(
        userId,
        lessonCode,
        reference.level,
        nextWordIndex,
        reference.totalWords,
      );
    }

    return {
      status,
      passed: chunkPassed,
      transcript: outcome.text,
      referenceText: reference.text,
      scores,
      words,
      threshold: {
        tier: threshold.tier,
        pron: threshold.pron,
        completeness: threshold.completeness,
      },
      startWordIndex,
      nextWordIndex,
      failedWordIndex,
      passedWordCount,
      totalWords: reference.totalWords,
      complete,
      referenceWords: reference.words,
      wordResults,
      consumedMs,
    };
  }

  /**
   * 통과한 마지막 단어가 오디오에서 끝나는 지점(ms).
   *
   * 이걸 안 주면 앱은 "어디까지 먹혔는지" 를 몰라서 녹음을 통째로 버리거나
   * 통째로 다시 보내야 한다. 앞은 뒤늦게 읽은 말을 잃고 뒤는 같은 오디오를
   * 반복 채점해서 돈이 샌다.
   */
  private consumedMsOf(
    aligned: (AssessedWord | null)[],
    passedWordCount: number,
  ): number {
    for (let index = passedWordCount - 1; index >= 0; index--) {
      const endMs = aligned[index]?.endMs;
      if (endMs != null && endMs > 0) return endMs;
    }
    return 0;
  }

  /**
   * 맞춰둔 결과를 앞에서부터 훑어 어디까지 읽었고 어디서 틀렸는지 정한다.
   *
   * 규칙 하나가 핵심이다: **안 읽은 단어와 잘못 읽은 단어를 구분한다.**
   * 한 번에 5단어를 참조로 주는데 유저는 보통 그중 일부만 읽고 숨을 고른다.
   * 안 읽은 나머지를 오답으로 치면 아직 읽지도 않은 단어가 빨갛게 뜬다.
   */
  private gradeReadingWords(
    reference: string[],
    aligned: (AssessedWord | null)[],
    startWordIndex: number,
  ) {
    const wordResults = this.blankReadingWords(
      reference,
      startWordIndex,
    ).wordResults;
    let passedWordCount = 0;
    let failedWordOffset: number | null = null;

    for (let index = 0; index < reference.length; index++) {
      const assessed = aligned[index];

      // 안 읽었다 (Omission 이거나 응답에 아예 없다)
      if (!assessed || assessed.errorType === 'Omission') {
        // 뒤쪽에 읽은 단어가 있으면 "건너뛰고 읽었다" 는 뜻이라 오답이다.
        // 없으면 여기까지 읽고 쉰 것이니 통과도 오답도 아니고 그냥 멈춘다.
        const spokeLater = aligned
          .slice(index + 1)
          .some(
            (later) =>
              !!later && later.errorType !== 'Omission' && later.accuracy > 0,
          );
        if (spokeLater) {
          failedWordOffset = index;
          wordResults[index].status = 'failed';
        }
        break;
      }

      wordResults[index].accuracy = assessed.accuracy;

      if (assessed.accuracy < this.readingWordBar(reference[index])) {
        failedWordOffset = index;
        wordResults[index].status = 'failed';
        break;
      }

      wordResults[index].status = 'passed';
      passedWordCount++;
    }

    return { passedWordCount, failedWordOffset, wordResults };
  }

  private blankReadingWords(reference: string[], startWordIndex: number) {
    const wordResults: ReadingWordResult[] = reference.map((word, offset) => ({
      index: startWordIndex + offset,
      word,
      accuracy: null,
      status: 'not_read' as const,
    }));
    return {
      passedWordCount: 0,
      failedWordOffset: null as number | null,
      wordResults,
    };
  }

  /**
   * Azure 가 돌려준 단어를 참조 단어에 하나씩 맞춘다.
   *
   * 왜 위치로 그냥 못 믿는가 — 이게 "다 틀렸다고 나온다" 의 원인이었다:
   *  1) miscue 를 끄면 Azure 는 **인식한 단어만** 돌려준다. 안 읽은 단어는
   *     배열에서 통째로 빠져서 그 뒤가 한 칸씩 밀린다.
   *  2) miscue 를 켜도 Insertion(참조에 없는 말)이 배열 중간에 끼어든다.
   *  3) 한국어 어절을 Azure 가 우리 정규식과 다르게 자를 수 있다.
   *
   * 셋 중 하나만 일어나도 한 칸 밀리고, 그 뒤 단어는 전부 엉뚱한 참조와
   * 비교돼서 낮은 점수가 나온다. 그래서 이름으로 맞춘다.
   */
  private alignToReference(
    reference: string[],
    assessed: AssessedWord[],
  ): (AssessedWord | null)[] {
    // 참조에 없는 말은 자리 계산에서 뺀다
    const usable = assessed.filter((w) => w.errorType !== 'Insertion');

    // 정상 경로: 개수도 맞고 단어도 순서대로 맞으면 그대로 쓴다
    if (
      usable.length === reference.length &&
      usable.every((w, i) => this.sameWord(w.word, reference[i]))
    ) {
      return usable;
    }

    const out: (AssessedWord | null)[] = [];
    let cursor = 0;
    for (const ref of reference) {
      let found = -1;
      // 앞뒤로 조금만 본다. 멀리까지 뒤지면 우연히 같은 단어에 붙는다
      for (let j = cursor; j < usable.length && j <= cursor + 2; j++) {
        if (this.sameWord(usable[j].word, ref)) {
          found = j;
          break;
        }
      }
      if (found >= 0) {
        out.push(usable[found]);
        cursor = found + 1;
      } else {
        out.push(null);
      }
    }
    return out;
  }

  /** 문장부호·대소문자·유니코드 표기 차이를 무시하고 같은 단어인지 본다 */
  private sameWord(a: string, b: string): boolean {
    const left = normalizeWord(a);
    return left === normalizeWord(b) && left.length > 0;
  }

  /**
   * 이 단어를 통과로 볼 점수.
   * 짧은 어절은 Azure 점수가 들쭉날쭉해서 기준을 낮춘다 (상수 파일 주석 참고).
   */
  private readingWordBar(word: string): number {
    return Array.from(word).length < READING_SHORT_WORD_LENGTH
      ? READING_SHORT_WORD_ACCURACY
      : READING_WORD_ACCURACY;
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
    enableMiscue = false,
  ): Promise<RecognizeOutcome> {
    const speechConfig = this.buildSpeechConfig();
    const audioConfig = sdk.AudioConfig.fromWavFileInput(wav);
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    if (referenceText) {
      const paConfig = new sdk.PronunciationAssessmentConfig(
        referenceText,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Word,
        // enableMiscue: 참조에 없는 말을 삽입/누락으로 잡을지.
        //
        // 문장 평가와 읽기 연습 모두 켠다. **끄면 Azure 가 "인식한 단어만"
        // 돌려주고 안 읽은 단어는 배열에서 아예 빠진다.** 그러면 참조 단어와
        // 위치가 어긋나서, 짧은 어절 하나만 못 알아들어도 그 뒤가 전부
        // 오답으로 밀린다. 켜면 참조 단어마다 Omission 이 명시적으로 와서
        // "아직 안 읽음" 과 "잘못 읽음" 을 구분할 수 있다.
        enableMiscue,
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
        cancelReason:
          `${sdk.CancellationReason[details.reason]} ${details.errorDetails ?? ''}`.trim(),
      };
    }

    if (result.reason !== sdk.ResultReason.RecognizedSpeech) {
      return {
        status: 'error',
        text: result.text ?? '',
        scores: null,
        words: [],
      };
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
    const region = this.configService
      .get<string>('AZURE_SPEECH_REGION')
      ?.trim();
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

  private async resolveExpression(expressionId: string) {
    if (!Types.ObjectId.isValid(expressionId)) {
      throw new BadRequestException('INVALID_EXPRESSION_ID');
    }

    const expression = await this.expressionModel
      .findOne({ _id: new Types.ObjectId(expressionId), isActive: true })
      .select('korean placements')
      .lean();
    if (!expression) throw new NotFoundException('EXPRESSION_NOT_FOUND');

    const referenceText = expression.korean.trim();
    if (!referenceText) {
      throw new BadRequestException('EXPRESSION_HAS_NO_REFERENCE_TEXT');
    }

    const sections = (expression.placements ?? [])
      .map((placement) => placement.section)
      .filter((section) => Number.isFinite(section));
    return {
      referenceText,
      section: sections.length ? Math.min(...sections) : undefined,
    };
  }

  private async resolveReadingChunk(
    lessonCode: string,
    startWordIndex: number,
    wordCount: number,
  ) {
    if (!Number.isInteger(startWordIndex) || startWordIndex < 0) {
      throw new BadRequestException('INVALID_READING_WORD_INDEX');
    }
    if (!Number.isInteger(wordCount) || wordCount < 1 || wordCount > 12) {
      throw new BadRequestException('INVALID_READING_WORD_COUNT');
    }

    const lesson = await this.readingLessonModel
      .findOne({ code: lessonCode, isActive: true })
      .select('level passage')
      .lean();
    if (!lesson) throw new NotFoundException('READING_LESSON_NOT_FOUND');

    const passageText = lesson.passage
      .map((paragraph) =>
        paragraph.segments.map((segment) => segment.text).join(''),
      )
      .join('\n\n');
    const words = readingWords(passageText);
    if (startWordIndex >= words.length) {
      throw new BadRequestException('READING_WORD_INDEX_OUT_OF_RANGE');
    }

    const referenceWords = words.slice(
      startWordIndex,
      startWordIndex + wordCount,
    );
    return {
      text: referenceWords.join(' '),
      words: referenceWords,
      totalWords: words.length,
      level: lesson.level,
    };
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
