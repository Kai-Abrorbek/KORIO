import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  VoiceTutorAgentsService,
  defaultVoiceTutorPlan,
  type TutorReactionMeta,
} from './agents/voice-tutor-agents.service';
import type { UpdateVoiceTutorSettingsDto } from './dto/voice-tutor.dto';
import type { VoiceTutorAgentTurnDto } from './dto/voice-tutor.dto';
import { detectTranscriptLanguage } from './language/detect-transcript-language';
import { voiceTutorGreeting } from './personality/greeting';
import { VoiceTutorProfileService } from './memory/voice-tutor-profile.service';
import { ElevenLabsTutorTtsProvider } from './providers/elevenlabs-tts.provider';
import { OpenAiSttProvider } from './providers/openai-stt.provider';
import {
  VoiceTutorMessage,
  VoiceTutorMessageDocument,
} from './schemas/voice-tutor-message.schema';
import {
  VoiceTutorSession,
  VoiceTutorSessionDocument,
} from './schemas/voice-tutor-session.schema';
import {
  VOICE_TUTOR_PROGRESS_INTERVAL,
  VOICE_TUTOR_RECENT_MESSAGES,
  tutorTargetLanguage,
  voiceTutorModels,
  voiceTutorReasoningEffort,
  voiceTutorVoices,
  type TutorTargetLanguage,
} from './voice-tutor.config';
import { VoiceTutorAudioService } from './voice-tutor-audio.service';
import { VoiceTutorQuotaService } from './voice-tutor-quota.service';
import {
  connectionFallback,
  findPreemptivePhantom,
  lessonProgress,
  planForTopic,
  sttKeywordsFromPlan,
  unavailableFallback,
} from './voice-tutor-turn-helpers';
import { VoiceTutorProviderError } from './providers/provider-error';
import { voiceTutorTopic } from './topics/voice-tutor-topics';
import {
  VoiceTutorLiveKitService,
  type VoiceTutorLiveKitGrant,
} from './livekit/voice-tutor-livekit.service';
import type {
  TutorMessage,
  TutorPlan,
  TutorReaction,
  TutorSettings,
} from './voice-tutor.types';

/**
 * Cost guard against a runaway loop, not a lesson length: the quota and the
 * worker's hard stop already end the lesson on time. At 60, a MAX learner's
 * short ping-pong turns hit the cap after ~20 minutes of a 60-minute lesson,
 * and the worker could only answer "connection glitched, say it again".
 */
const MAX_SESSION_TURNS = 300;
const MAX_SESSION_AGE_MS = 60 * 60 * 1000;
const STALE_PROCESSING_MS = 2 * 60 * 1000;

/** Sessions created before the English tutor carry no language: Korean. */
const sessionLanguage = (session: {
  targetLanguage?: string;
  settings?: TutorSettings;
}): TutorTargetLanguage =>
  tutorTargetLanguage(
    session.targetLanguage ?? session.settings?.targetLanguage,
  );

@Injectable()
export class VoiceTutorService {
  private readonly logger = new Logger(VoiceTutorService.name);
  private readonly progressTasks = new Map<string, Promise<void>>();
  private readonly replayTasks = new Map<string, Promise<TutorMessage>>();

  constructor(
    @InjectModel(VoiceTutorSession.name)
    private readonly sessions: Model<VoiceTutorSessionDocument>,
    @InjectModel(VoiceTutorMessage.name)
    private readonly messages: Model<VoiceTutorMessageDocument>,
    private readonly profile: VoiceTutorProfileService,
    private readonly agents: VoiceTutorAgentsService,
    private readonly stt: OpenAiSttProvider,
    private readonly tts: ElevenLabsTutorTtsProvider,
    private readonly audio: VoiceTutorAudioService,
    private readonly livekit: VoiceTutorLiveKitService,
    private readonly quota: VoiceTutorQuotaService,
  ) {}

  getQuota(userId: string) {
    return this.quota.getQuota(userId);
  }

  options() {
    return this.profile.options();
  }
  settings(userId: string, targetLanguage?: TutorTargetLanguage) {
    return this.profile.getSettings(userId, targetLanguage);
  }
  updateSettings(
    userId: string,
    patch: UpdateVoiceTutorSettingsDto,
    targetLanguage?: TutorTargetLanguage,
  ) {
    return this.profile.updateSettings(userId, patch, targetLanguage);
  }

  async start(
    userId: string,
    overrides?: UpdateVoiceTutorSettingsDto,
    topicId?: string,
    targetLanguage: TutorTargetLanguage = 'ko',
  ) {
    const settings =
      overrides && Object.keys(overrides).length
        ? await this.profile.updateSettings(userId, overrides, targetLanguage)
        : await this.profile.getSettings(userId, targetLanguage);
    const voice = this.assertVoice(settings);
    // 가장 비싼 기능 — 한도는 세션 발급 지점에서 막는다 (한국어·영어 튜터가 같이 쓴다)
    const quota = await this.quota.assertCanStart(userId);
    const memory = await this.profile.getMemory(userId, targetLanguage);
    let plan = await this.profile.latestPlan(userId, targetLanguage);
    if (!plan) {
      try {
        plan = await this.agents.plan(settings, memory, null, null);
      } catch {
        plan = defaultVoiceTutorPlan(memory, targetLanguage);
      }
      await this.profile.savePlan(userId, null, plan, targetLanguage);
    }
    // 주제를 골랐으면 이번 수업만 그 주제로. 저장된 "다음 수업 계획" 은
    // 건드리지 않는다 — 주제 수업이 끝나면 원래 계획으로 돌아간다
    const topic = topicId
      ? voiceTutorTopic(targetLanguage, topicId)
      : undefined;
    if (topicId && !topic)
      throw new BadRequestException('VOICE_TUTOR_UNKNOWN_TOPIC');
    if (topic) plan = planForTopic(plan, topic, targetLanguage);
    let opening: TutorReaction;
    try {
      // Generate before creating the timed session, without fabricating a user turn.
      opening = await this.agents.lesson(
        settings,
        plan,
        memory,
        [],
        lessonProgress(0, []),
      );
    } catch {
      const text = voiceTutorGreeting(
        settings,
        plan,
        topic?.title[settings.explanationLanguage],
      );
      opening = {
        displayText: text,
        speechText: text,
        language: settings.explanationLanguage,
        emotion: 'happy',
        delivery: 'normal',
        intensity: 0.25,
        gesture: 'none',
      };
    }
    const session = await this.sessions.create({
      userId: new Types.ObjectId(userId),
      status: 'active',
      settings,
      plan,
      targetLanguage,
      topicId: topic?.id ?? null,
      allowedSec: quota.allowedSec,
      tier: quota.tier,
      taughtItems: opening.taught ?? [],
    });
    const sessionId = session._id.toString();
    const initialMessage = await this.saveTeacherMessage(
      userId,
      sessionId,
      settings,
      opening,
      undefined,
      false,
    );
    let livekit: VoiceTutorLiveKitGrant;
    try {
      livekit = await this.livekit.prepareRoom(
        sessionId,
        voice.providerVoiceId,
        {
          displayText: initialMessage.displayText ?? initialMessage.text,
          speechText: initialMessage.speechText ?? initialMessage.text,
        },
        // 워커의 받아쓰기(STT) 언어 힌트용. 학습자가 배우는 말과 모국어를 섞어 말한다
        settings.explanationLanguage,
        sttKeywordsFromPlan(plan, opening.taught, targetLanguage),
        quota.allowedSec,
        targetLanguage,
      );
    } catch (error) {
      await Promise.all([
        this.messages.deleteMany({ sessionId: session._id }),
        this.sessions.deleteOne({ _id: session._id }),
      ]);
      throw error;
    }
    return {
      sessionId,
      status: 'active' as const,
      settings,
      plan,
      initialMessage,
      livekit,
      /** 이 수업에서 쓸 수 있는 최대 길이(초) — 앱 타이머가 이걸로 남은 시간을 보여 준다 */
      maxDurationSec: quota.allowedSec,
    };
  }

  async get(userId: string, sessionId: string) {
    const session = await this.ownedSession(userId, sessionId);
    const [rows, progress] = await Promise.all([
      this.messages
        .find({ sessionId: session._id })
        .sort({ createdAt: 1, _id: 1 })
        .lean(),
      this.profile.latestProgress(sessionId),
    ]);
    return {
      sessionId,
      status: session.status,
      settings: session.settings,
      plan: session.plan,
      progress,
      messages: rows.map((row) => this.presentMessage(row)),
    };
  }

  async replayAudio(userId: string, sessionId: string, messageId: string) {
    const session = await this.ownedSession(userId, sessionId);
    if (!Types.ObjectId.isValid(messageId))
      throw new NotFoundException('VOICE_TUTOR_MESSAGE_NOT_FOUND');
    const key = `${sessionId}:${messageId}`;
    const pending = this.replayTasks.get(key);
    if (pending) return pending;
    const task = this.createReplayAudio(userId, session, messageId).finally(
      () => this.replayTasks.delete(key),
    );
    this.replayTasks.set(key, task);
    return task;
  }

  private async createReplayAudio(
    userId: string,
    session: VoiceTutorSessionDocument,
    messageId: string,
  ): Promise<TutorMessage> {
    const row = await this.messages.findOne({
      _id: new Types.ObjectId(messageId),
      sessionId: session._id,
      userId: new Types.ObjectId(userId),
      role: 'teacher',
    });
    if (!row) throw new NotFoundException('VOICE_TUTOR_MESSAGE_NOT_FOUND');
    if (row.audioId) {
      try {
        await this.audio.read(userId, String(row.audioId));
        return this.presentMessage(row);
      } catch (error) {
        if (!(error instanceof NotFoundException)) throw error;
        // Temporary MP3 expired; this message remains replayable on demand.
      }
    }
    const voice = this.assertVoice(session.settings);
    const data = await this.tts.synthesize(
      row.speechText ?? row.text,
      voice.providerVoiceId,
      {
        displayText: row.displayText ?? row.text,
        speechText: row.speechText ?? row.text,
        emotion: row.emotion ?? 'neutral',
        delivery: row.delivery ?? 'normal',
        intensity: row.intensity ?? 0,
        correction: row.correction,
        gesture: row.gesture,
        language: row.language,
      },
    );
    const audioUrl = await this.audio.store(userId, data);
    const audioId = new Types.ObjectId(audioUrl.split('/').at(-1));
    await this.messages.updateOne(
      { _id: row._id, audioId: row.audioId ?? null },
      { $set: { audioId } },
    );
    const updated = await this.messages.findById(row._id);
    if (!updated) throw new NotFoundException('VOICE_TUTOR_MESSAGE_NOT_FOUND');
    return this.presentMessage(updated);
  }

  async turn(
    userId: string,
    sessionId: string,
    audio: Buffer,
    mimeType: string,
  ) {
    return this.processTurn(
      userId,
      sessionId,
      undefined,
      () => this.stt.transcribe(audio, mimeType),
      true,
    );
  }

  async agentTurn(
    sessionId: string,
    authorization: string | undefined,
    dto: VoiceTutorAgentTurnDto,
  ) {
    this.livekit.verifyAgentToken(sessionId, authorization);
    if (!Types.ObjectId.isValid(sessionId))
      throw new NotFoundException('VOICE_TUTOR_SESSION_NOT_FOUND');
    const session = await this.sessions.findById(sessionId);
    if (!session) throw new NotFoundException('VOICE_TUTOR_SESSION_NOT_FOUND');
    return this.processTurn(
      String(session.userId),
      sessionId,
      dto.turnId,
      () => Promise.resolve(dto.transcript.trim()),
      false,
    );
  }

  /**
   * Same turn as `agentTurn`, but the teacher's words go to `onSpeech` while
   * the model is still writing them, so the worker can start TTS on the first
   * sentence. Everything before the first word (auth, lock, dedupe) throws as
   * usual so the controller can still answer 401/404/409.
   */
  async agentTurnStream(
    sessionId: string,
    authorization: string | undefined,
    dto: VoiceTutorAgentTurnDto,
    onSpeech: (delta: string) => void,
    signal?: AbortSignal,
    onMeta?: (meta: TutorReactionMeta) => void,
  ) {
    this.livekit.verifyAgentToken(sessionId, authorization);
    if (!Types.ObjectId.isValid(sessionId))
      throw new NotFoundException('VOICE_TUTOR_SESSION_NOT_FOUND');
    const session = await this.sessions.findById(sessionId);
    if (!session) throw new NotFoundException('VOICE_TUTOR_SESSION_NOT_FOUND');
    return this.processTurn(
      String(session.userId),
      sessionId,
      dto.turnId,
      () => Promise.resolve(dto.transcript.trim()),
      false,
      { onSpeech, signal, onMeta },
    );
  }

  private async processTurn(
    userId: string,
    sessionId: string,
    turnId: string | undefined,
    transcribe: () => Promise<string>,
    synthesizeAudio: boolean,
    live?: {
      onSpeech: (delta: string) => void;
      signal?: AbortSignal;
      onMeta?: (meta: TutorReactionMeta) => void;
    },
  ) {
    const session = await this.lockActiveSession(userId, sessionId);
    try {
      const existingUser = turnId
        ? await this.messages.findOne({
            sessionId: session._id,
            turnId,
            role: 'user',
          })
        : null;
      if (existingUser) {
        const transcript = await transcribe();
        if (existingUser.text !== transcript)
          throw new ConflictException('VOICE_TUTOR_TURN_ID_REUSED');
        const teacher = await this.messages.findOne({
          sessionId: session._id,
          turnId,
          role: 'teacher',
        });
        if (teacher) {
          // A worker retry of a turn that already finished: replay the saved
          // words instead of generating (and paying for) a second reply.
          live?.onSpeech(teacher.speechText || teacher.text);
          return {
            userMessage: this.presentMessage(existingUser),
            teacherMessage: this.presentMessage(teacher),
            progress: await this.profile.latestProgress(sessionId),
            warning: null,
          };
        }
      }
      if (
        !existingUser &&
        (session.userTurnCount >= MAX_SESSION_TURNS ||
          Date.now() - new Date(session.createdAt ?? 0).getTime() >
            MAX_SESSION_AGE_MS)
      ) {
        throw new BadRequestException('VOICE_TUTOR_SESSION_LIMIT');
      }
      const transcript = existingUser?.text ?? (await transcribe());
      if (!transcript)
        throw new BadRequestException('VOICE_TUTOR_EMPTY_TRANSCRIPTION');
      const startedAt = Date.now();
      const newUser = !existingUser;
      let turnCount = session.userTurnCount + (newUser ? 1 : 0);
      // One round of DB work instead of four in a row — every one of them is a
      // trip to Atlas sitting in front of the teacher's first word.
      const [userMessage, memory, recentRows] = await Promise.all([
        existingUser ??
          this.messages.create({
            userId: new Types.ObjectId(userId),
            sessionId: session._id,
            role: 'user',
            turnId,
            text: transcript,
            language: detectTranscriptLanguage(transcript),
            audioId: null,
          }),
        this.profile.getMemory(userId, sessionLanguage(session)),
        this.messages
          .find({ sessionId: session._id })
          .sort({ createdAt: -1, _id: -1 })
          .limit(VOICE_TUTOR_RECENT_MESSAGES + 2)
          .lean(),
        newUser
          ? this.sessions.updateOne(
              { _id: session._id },
              { $set: { userTurnCount: turnCount } },
            )
          : Promise.resolve(null),
      ]);
      let history = recentRows
        .filter((row) => String(row._id) !== String(userMessage._id))
        .reverse();
      if (newUser) {
        const phantom = findPreemptivePhantom(history, transcript);
        if (phantom) {
          // The worker drafted a reply to the first half of this sentence
          // (LiveKit preemptive generation) and the learner kept talking. That
          // draft was never heard — drop it so the tutor does not answer twice
          // or refer to words the learner never got.
          history = history.filter((row) => !phantom.includes(row));
          turnCount -= 1;
          void Promise.all([
            this.messages.deleteMany({
              _id: { $in: phantom.map((row) => row._id) },
            }),
            this.sessions.updateOne(
              { _id: session._id },
              { $inc: { userTurnCount: -1 } },
            ),
          ]).catch((error: Error) =>
            this.logger.warn(`Voice Tutor phantom cleanup: ${error.name}`),
          );
        }
      }
      const prepMs = Date.now() - startedAt;
      let firstWordMs: number | undefined;
      const onSpeech = live
        ? (delta: string) => {
            firstWordMs ??= Date.now() - startedAt;
            live.onSpeech(delta);
          }
        : undefined;
      let reply: TutorReaction;
      let warning: string | null = null;
      try {
        const recent = [
          ...history
            .slice(-(VOICE_TUTOR_RECENT_MESSAGES - 1))
            .map(({ role, text }) => ({ role, text })),
          { role: 'user' as const, text: userMessage.text },
        ];
        reply =
          live && onSpeech
            ? await this.agents.lessonStream(
                session.settings,
                session.plan,
                memory,
                recent,
                onSpeech,
                live.signal,
                live.onMeta,
                lessonProgress(turnCount, session.taughtItems ?? []),
              )
            : await this.agents.lesson(
                session.settings,
                session.plan,
                memory,
                recent,
                lessonProgress(turnCount, session.taughtItems ?? []),
              );
      } catch (error) {
        if (live?.signal?.aborted) {
          // Cancelled before the learner heard anything (preemptive draft
          // thrown away, or the worker hung up): leave no trace. The real turn
          // arrives with its own turnId.
          if (newUser)
            await Promise.all([
              this.messages.deleteOne({ _id: userMessage._id }),
              this.sessions.updateOne(
                { _id: session._id },
                { $inc: { userTurnCount: -1 } },
              ),
            ]);
          throw error;
        }
        // 계정이 막혔으면(크레딧·키) 매 턴 "연결이 불안정해요" 대신 한 번 안내하고,
        // 워커가 이 경고를 보고 통화를 끝낸다 (apps/tutor-agent voice-tutor-provider)
        const blocked =
          error instanceof VoiceTutorProviderError && error.code === 'BLOCKED';
        if (blocked)
          this.logger.error(
            `Voice Tutor model account blocked (credits/key) — session ${sessionId} ends`,
          );
        warning = blocked
          ? 'VOICE_TUTOR_PROVIDER_BLOCKED'
          : 'VOICE_TUTOR_LESSON_UNAVAILABLE';
        const fallback = (blocked ? unavailableFallback : connectionFallback)(
          session.settings.explanationLanguage,
          session.settings.speechStyle,
        );
        reply = {
          displayText: fallback,
          speechText: fallback,
          language: session.settings.explanationLanguage,
          emotion: 'neutral',
          delivery: 'normal',
          intensity: 0.1,
          gesture: 'none',
        };
        // lessonStream only throws when nothing was spoken yet.
        live?.onSpeech(fallback);
      }
      if (live)
        this.logger.log(
          `Voice Tutor turn ${sessionId}: ${voiceTutorModels().lesson}/${voiceTutorReasoningEffort()} ${session.settings.personality}, db ${prepMs}ms, first word ${firstWordMs ?? '-'}ms, total ${Date.now() - startedAt}ms`,
        );
      const teacherMessage = await this.saveTeacherMessage(
        userId,
        sessionId,
        session.settings,
        reply,
        turnId,
        synthesizeAudio,
      );
      if (reply.taught?.length) {
        void this.sessions
          .updateOne(
            { _id: session._id },
            {
              $push: {
                taughtItems: { $each: reply.taught, $slice: -60 },
              },
            },
          )
          .catch((error: Error) =>
            this.logger.warn(
              `Voice Tutor taught items deferred: ${error.name}`,
            ),
          );
      }
      if (reply.correction?.wrong && reply.correction.correct) {
        await this.profile
          .recordCorrection(
            userId,
            reply.correction.wrong,
            reply.correction.correct,
            sessionLanguage(session),
          )
          .catch((error: Error) =>
            this.logger.warn(
              `Voice Tutor correction memory deferred: ${error.name}`,
            ),
          );
      }
      if (synthesizeAudio && !teacherMessage.audioUrl)
        warning ??= 'VOICE_TUTOR_TTS_UNAVAILABLE';
      if (turnCount % VOICE_TUTOR_PROGRESS_INTERVAL === 0) {
        this.scheduleProgress(userId, sessionId, turnCount);
      }
      return {
        userMessage: this.presentMessage(userMessage),
        teacherMessage,
        progress: await this.profile.latestProgress(sessionId),
        warning,
      };
    } finally {
      await this.sessions.updateOne(
        { _id: session._id },
        {
          $set: { processing: false, processingAt: null },
        },
      );
      const pendingEnd = await this.sessions
        .findById(session._id)
        .select('endRequested')
        .lean();
      if (pendingEnd?.endRequested) {
        void this.end(userId, sessionId).catch((error: Error) =>
          this.logger.warn(`Voice Tutor deferred end failed: ${error.name}`),
        );
      }
    }
  }

  async end(userId: string, sessionId: string) {
    const prior = await this.ownedSession(userId, sessionId);
    if (prior.status === 'ended') {
      return {
        sessionId,
        status: 'ended' as const,
        progress: await this.profile.latestProgress(sessionId),
        plan: await this.profile.latestPlan(userId, sessionLanguage(prior)),
      };
    }
    let session: VoiceTutorSessionDocument;
    try {
      session = await this.lockActiveSession(userId, sessionId);
    } catch (error) {
      if (!(error instanceof ConflictException)) throw error;
      await this.sessions.updateOne(
        {
          _id: prior._id,
          userId: new Types.ObjectId(userId),
          status: 'active',
        },
        { $set: { endRequested: true } },
      );
      return {
        sessionId,
        status: 'ending' as const,
        progress: await this.profile.latestProgress(sessionId),
        plan: prior.plan,
      };
    }
    try {
      await this.progressTasks.get(sessionId)?.catch(() => undefined);
      if (session.userTurnCount > 0) {
        await this.runProgress(userId, sessionId, session.userTurnCount).catch(
          (error: Error) => {
            this.logger.warn(`Voice Tutor progress deferred: ${error.name}`);
          },
        );
      }
      const [memory, progress] = await Promise.all([
        this.profile.getMemory(userId, sessionLanguage(session)),
        this.profile.latestProgress(sessionId),
      ]);
      let plan: TutorPlan;
      try {
        plan = await this.agents.plan(
          session.settings,
          memory,
          progress,
          session.plan,
        );
      } catch {
        // Keep the learner's last useful plan if planning is temporarily down.
        plan =
          session.plan ??
          defaultVoiceTutorPlan(memory, sessionLanguage(session));
      }
      await this.profile.savePlan(
        userId,
        sessionId,
        plan,
        sessionLanguage(session),
      );
      await this.sessions.updateOne(
        { _id: session._id },
        {
          $set: {
            status: 'ended',
            endedAt: new Date(),
            processing: false,
            processingAt: null,
          },
        },
      );
      await this.profile.markLessonComplete(userId, sessionLanguage(session));
      return { sessionId, status: 'ended' as const, progress, plan };
    } finally {
      await this.sessions.updateOne(
        { _id: session._id, status: 'active' },
        {
          $set: { processing: false, processingAt: null },
        },
      );
    }
  }

  private scheduleProgress(
    userId: string,
    sessionId: string,
    turnCount: number,
  ) {
    if (this.progressTasks.has(sessionId)) return;
    const task = this.runProgress(userId, sessionId, turnCount)
      .catch((error: Error) =>
        this.logger.warn(`Voice Tutor progress deferred: ${error.name}`),
      )
      .finally(() => this.progressTasks.delete(sessionId));
    this.progressTasks.set(sessionId, task);
  }

  private async runProgress(
    userId: string,
    sessionId: string,
    turnCount: number,
  ) {
    const session = await this.ownedSession(userId, sessionId);
    if (session.progressAnalyzedTurns >= turnCount) return;
    // A failed earlier batch must not cause its turns to be silently skipped.
    // Sessions are capped (MAX_SESSION_TURNS); only bounded slices go to AI.
    const rows = await this.messages
      .find({ sessionId: session._id })
      .sort({ createdAt: 1, _id: 1 })
      .lean();
    let analyzed = session.progressAnalyzedTurns;
    while (analyzed < turnCount) {
      const next = Math.min(
        turnCount,
        analyzed + VOICE_TUTOR_PROGRESS_INTERVAL,
      );
      let userTurns = 0;
      const batch = rows.flatMap(({ role, text }) => {
        if (role === 'user') userTurns += 1;
        return userTurns > analyzed && userTurns <= next
          ? [{ role, text }]
          : [];
      });
      if (!batch.some(({ role }) => role === 'user')) break;
      const memory = await this.profile.getMemory(
        userId,
        sessionLanguage(session),
      );
      const result = await this.agents.analyzeProgress(
        session.settings,
        memory,
        batch,
      );
      await this.profile.saveProgress(
        userId,
        sessionId,
        next,
        result,
        sessionLanguage(session),
      );
      await this.sessions.updateOne(
        { _id: session._id },
        { $max: { progressAnalyzedTurns: next } },
      );
      analyzed = next;
    }
  }

  private async saveTeacherMessage(
    userId: string,
    sessionId: string,
    settings: TutorSettings,
    reaction: TutorReaction,
    turnId?: string,
    synthesizeAudio = true,
  ): Promise<TutorMessage> {
    const voice = this.assertVoice(settings);
    let audioId: Types.ObjectId | null = null;
    let audioUrl: string | null = null;
    if (synthesizeAudio) {
      try {
        const data = await this.tts.synthesize(
          reaction.speechText,
          voice.providerVoiceId,
          reaction,
        );
        audioUrl = await this.audio.store(userId, data);
        audioId = new Types.ObjectId(audioUrl.split('/').at(-1));
      } catch (error) {
        this.logger.warn(
          `Voice Tutor TTS unavailable: ${(error as Error).name}`,
        );
      }
    }
    const row = await this.messages.create({
      userId: new Types.ObjectId(userId),
      sessionId: new Types.ObjectId(sessionId),
      turnId,
      role: 'teacher',
      text: reaction.displayText,
      displayText: reaction.displayText,
      speechText: reaction.speechText,
      emotion: reaction.emotion,
      delivery: reaction.delivery,
      intensity: reaction.intensity,
      correction: reaction.correction,
      gesture: reaction.gesture,
      language: reaction.language,
      audioId,
    });
    return { ...this.presentMessage(row), audioUrl };
  }

  private assertVoice(settings: TutorSettings) {
    const voice = voiceTutorVoices().find(
      (item) => item.id === settings.voiceId,
    );
    if (!voice)
      throw new ServiceUnavailableException('VOICE_TUTOR_NO_VOICE_CONFIGURED');
    return voice;
  }

  private async ownedSession(userId: string, sessionId: string) {
    if (!Types.ObjectId.isValid(sessionId))
      throw new NotFoundException('VOICE_TUTOR_SESSION_NOT_FOUND');
    const session = await this.sessions.findOne({
      _id: new Types.ObjectId(sessionId),
      userId: new Types.ObjectId(userId),
    });
    if (!session) throw new NotFoundException('VOICE_TUTOR_SESSION_NOT_FOUND');
    return session;
  }

  private async lockActiveSession(userId: string, sessionId: string) {
    if (!Types.ObjectId.isValid(sessionId))
      throw new NotFoundException('VOICE_TUTOR_SESSION_NOT_FOUND');
    const session = await this.sessions.findOneAndUpdate(
      {
        _id: new Types.ObjectId(sessionId),
        userId: new Types.ObjectId(userId),
        status: 'active',
        $or: [
          { processing: false },
          { processingAt: { $lt: new Date(Date.now() - STALE_PROCESSING_MS) } },
        ],
      },
      { $set: { processing: true, processingAt: new Date() } },
      { new: true },
    );
    if (!session) throw new ConflictException('VOICE_TUTOR_SESSION_BUSY');
    return session;
  }

  private presentMessage(
    row: VoiceTutorMessage | VoiceTutorMessageDocument,
  ): TutorMessage {
    const raw = row as VoiceTutorMessageDocument;
    return {
      id: String(raw._id),
      role: row.role,
      text: row.text,
      displayText: row.displayText,
      speechText: row.speechText,
      emotion: row.emotion,
      delivery: row.delivery,
      intensity: row.intensity,
      correction: row.correction,
      gesture: row.gesture,
      language: row.language,
      audioUrl: row.audioId
        ? `/voice-tutor/audio/${String(row.audioId)}`
        : null,
      timestamp: raw.createdAt ?? new Date(),
    };
  }
}
