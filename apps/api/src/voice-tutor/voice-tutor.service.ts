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
} from './agents/voice-tutor-agents.service';
import type { UpdateVoiceTutorSettingsDto } from './dto/voice-tutor.dto';
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
  voiceTutorVoices,
} from './voice-tutor.config';
import { VoiceTutorAudioService } from './voice-tutor-audio.service';
import type {
  TutorMessage,
  TutorPlan,
  TutorReaction,
  TutorSettings,
} from './voice-tutor.types';

const MAX_SESSION_TURNS = 60;
const MAX_SESSION_AGE_MS = 60 * 60 * 1000;
const STALE_PROCESSING_MS = 2 * 60 * 1000;

@Injectable()
export class VoiceTutorService {
  private readonly logger = new Logger(VoiceTutorService.name);
  private readonly progressTasks = new Map<string, Promise<void>>();

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
  ) {}

  options() {
    return this.profile.options();
  }
  settings(userId: string) {
    return this.profile.getSettings(userId);
  }
  updateSettings(userId: string, patch: UpdateVoiceTutorSettingsDto) {
    return this.profile.updateSettings(userId, patch);
  }

  async start(userId: string, overrides?: UpdateVoiceTutorSettingsDto) {
    const settings =
      overrides && Object.keys(overrides).length
        ? await this.profile.updateSettings(userId, overrides)
        : await this.profile.getSettings(userId);
    this.assertVoice(settings);
    const memory = await this.profile.getMemory(userId);
    let plan = await this.profile.latestPlan(userId);
    if (!plan) {
      try {
        plan = await this.agents.plan(settings, memory, null, null);
      } catch {
        plan = defaultVoiceTutorPlan(memory);
      }
      await this.profile.savePlan(userId, null, plan);
    }
    const session = await this.sessions.create({
      userId: new Types.ObjectId(userId),
      status: 'active',
      settings,
      plan,
    });
    const sessionId = session._id.toString();
    const text = voiceTutorGreeting(settings, plan);
    const initialMessage = await this.saveTeacherMessage(
      userId,
      sessionId,
      settings,
      {
        displayText: text,
        speechText: text,
        language: 'ko',
        emotion: 'happy',
        delivery: 'normal',
        intensity: 0.25,
        gesture: 'none',
      },
    );
    return {
      sessionId,
      status: 'active' as const,
      settings,
      plan,
      initialMessage,
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

  async turn(
    userId: string,
    sessionId: string,
    audio: Buffer,
    mimeType: string,
  ) {
    const session = await this.lockActiveSession(userId, sessionId);
    try {
      if (
        session.userTurnCount >= MAX_SESSION_TURNS ||
        Date.now() - new Date(session.createdAt ?? 0).getTime() >
          MAX_SESSION_AGE_MS
      ) {
        throw new BadRequestException('VOICE_TUTOR_SESSION_LIMIT');
      }
      const transcript = await this.stt.transcribe(audio, mimeType);
      if (!transcript)
        throw new BadRequestException('VOICE_TUTOR_EMPTY_TRANSCRIPTION');
      const userMessage = await this.messages.create({
        userId: new Types.ObjectId(userId),
        sessionId: session._id,
        role: 'user',
        text: transcript,
        language: detectTranscriptLanguage(transcript),
        audioId: null,
      });
      const turnCount = session.userTurnCount + 1;
      await this.sessions.updateOne(
        { _id: session._id },
        { $set: { userTurnCount: turnCount } },
      );
      const [memory, recentRows] = await Promise.all([
        this.profile.getMemory(userId),
        this.messages
          .find({ sessionId: session._id })
          .sort({ createdAt: -1, _id: -1 })
          .limit(12)
          .lean(),
      ]);
      let reply: TutorReaction;
      let warning: string | null = null;
      try {
        reply = await this.agents.lesson(
          session.settings,
          session.plan,
          memory,
          recentRows.reverse().map(({ role, text }) => ({ role, text })),
        );
      } catch {
        warning = 'VOICE_TUTOR_LESSON_UNAVAILABLE';
        const fallback =
          session.settings.speechStyle === 'casual'
            ? '잠깐 연결이 불안정해. 다시 한 번 말해 줄래?'
            : '잠깐 연결이 불안정해요. 다시 한 번 말씀해 주시겠어요?';
        reply = {
          displayText: fallback,
          speechText: fallback,
          language: 'ko',
          emotion: 'neutral',
          delivery: 'normal',
          intensity: 0.1,
          gesture: 'none',
        };
      }
      const teacherMessage = await this.saveTeacherMessage(
        userId,
        sessionId,
        session.settings,
        reply,
      );
      if (reply.correction?.wrong && reply.correction.correct) {
        await this.profile
          .recordCorrection(
            userId,
            reply.correction.wrong,
            reply.correction.correct,
          )
          .catch((error: Error) =>
            this.logger.warn(
              `Voice Tutor correction memory deferred: ${error.name}`,
            ),
          );
      }
      if (!teacherMessage.audioUrl) warning ??= 'VOICE_TUTOR_TTS_UNAVAILABLE';
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
        plan: await this.profile.latestPlan(userId),
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
        this.profile.getMemory(userId),
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
        plan = session.plan ?? defaultVoiceTutorPlan(memory);
      }
      await this.profile.savePlan(userId, sessionId, plan);
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
      await this.profile.markLessonComplete(userId);
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
    // The session is capped at 60 turns; only bounded slices are sent to AI.
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
      const memory = await this.profile.getMemory(userId);
      const result = await this.agents.analyzeProgress(
        session.settings,
        memory,
        batch,
      );
      await this.profile.saveProgress(userId, sessionId, next, result);
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
  ): Promise<TutorMessage> {
    const voice = this.assertVoice(settings);
    let audioId: Types.ObjectId | null = null;
    let audioUrl: string | null = null;
    try {
      const data = await this.tts.synthesize(
        reaction.speechText,
        voice.providerVoiceId,
        reaction,
      );
      audioUrl = await this.audio.store(userId, data);
      audioId = new Types.ObjectId(audioUrl.split('/').at(-1));
    } catch (error) {
      this.logger.warn(`Voice Tutor TTS unavailable: ${(error as Error).name}`);
    }
    const row = await this.messages.create({
      userId: new Types.ObjectId(userId),
      sessionId: new Types.ObjectId(sessionId),
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
