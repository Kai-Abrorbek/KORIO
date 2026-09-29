import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import type { UpdateVoiceTutorSettingsDto } from '../dto/voice-tutor.dto';
import { VOICE_TUTOR_PERSONALITY_IDS } from '../personality/voice-tutor-personalities';
import {
  VoiceTutorMemory,
  VoiceTutorMemoryDocument,
} from '../schemas/voice-tutor-memory.schema';
import {
  VoiceTutorPlan,
  VoiceTutorPlanDocument,
} from '../schemas/voice-tutor-plan.schema';
import {
  VoiceTutorProgress,
  VoiceTutorProgressDocument,
} from '../schemas/voice-tutor-progress.schema';
import {
  VoiceTutorSettings,
  VoiceTutorSettingsDocument,
} from '../schemas/voice-tutor-settings.schema';
import {
  VOICE_TUTOR_LANGUAGES,
  VOICE_TUTOR_STYLES,
  tutorLanguageEnabled,
  voiceTutorVoices,
} from '../voice-tutor.config';
import type {
  TutorPlan,
  TutorProgress,
  TutorSettings,
} from '../voice-tutor.types';

export interface StudentMemorySnapshot {
  summary: string;
  estimatedLevel: string;
  grammarMistakes: string[];
  repeatedMistakes: string[];
  recurringMistakes: { wrong: string; correct: string; count: number }[];
  learnedVocabulary: string[];
  weakVocabulary: string[];
  strongPoints: string[];
  weakPoints: string[];
  notes: string;
  lessonsCompleted: number;
}

const emptyMemory = (): StudentMemorySnapshot => ({
  summary: '',
  estimatedLevel: 'beginner',
  grammarMistakes: [],
  repeatedMistakes: [],
  recurringMistakes: [],
  learnedVocabulary: [],
  weakVocabulary: [],
  strongPoints: [],
  weakPoints: [],
  notes: '',
  lessonsCompleted: 0,
});

const mergeList = (current: string[], additions: string[]): string[] =>
  [...new Set([...current, ...additions])].slice(-30);

@Injectable()
export class VoiceTutorProfileService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    @InjectModel(VoiceTutorSettings.name)
    private readonly settings: Model<VoiceTutorSettingsDocument>,
    @InjectModel(VoiceTutorMemory.name)
    private readonly memories: Model<VoiceTutorMemoryDocument>,
    @InjectModel(VoiceTutorPlan.name)
    private readonly plans: Model<VoiceTutorPlanDocument>,
    @InjectModel(VoiceTutorProgress.name)
    private readonly progress: Model<VoiceTutorProgressDocument>,
  ) {}

  options() {
    const voices = voiceTutorVoices();
    return {
      voices: voices.map((voice) => ({
        id: voice.id,
        name: voice.name,
        gender: voice.gender,
        description: voice.description,
        previewUrl: voice.previewUrl,
        supportedLanguages: voice.supportedLanguages,
        enabled: voice.enabled,
      })),
      explanationLanguages: VOICE_TUTOR_LANGUAGES.map((id) => ({
        id,
        name: { en: 'English', ru: 'Русский', uz: 'O‘zbekcha', ko: '한국어' }[id],
        enabled: tutorLanguageEnabled(id),
      })),
      speechStyles: [...VOICE_TUTOR_STYLES],
      personalities: [...VOICE_TUTOR_PERSONALITY_IDS],
      characters: [
        { id: 'female_01', name: 'Female Tutor', enabled: true },
        { id: 'male_01', name: 'Male Tutor', enabled: true },
      ],
      defaults: {
        voiceId: voices[0]?.id ?? '',
        speechStyle: 'polite',
        explanationLanguage: 'en',
        koreanLevel: 'beginner',
        personality: 'friendly',
        characterId: 'female_01',
      },
    };
  }

  async getSettings(userId: string): Promise<TutorSettings> {
    const stored = await this.settings
      .findOne({ userId: new Types.ObjectId(userId) })
      .lean();
    const voices = voiceTutorVoices();
    if (stored)
      return {
        voiceId: voices.some((voice) => voice.id === stored.voiceId)
          ? stored.voiceId
          : (voices[0]?.id ?? ''),
        speechStyle: stored.speechStyle,
        explanationLanguage: tutorLanguageEnabled(stored.explanationLanguage)
          ? stored.explanationLanguage
          : 'en',
        koreanLevel: stored.koreanLevel,
        personality: VOICE_TUTOR_PERSONALITY_IDS.includes(stored.personality)
          ? stored.personality
          : 'friendly',
        characterId: stored.characterId === 'male_01' ? 'male_01' : 'female_01',
      };
    const user = await this.users
      .findById(userId)
      .select('appLanguage selfReportedLevel level')
      .lean();
    const language = user?.appLanguage;
    return {
      voiceId: voices[0]?.id ?? '',
      speechStyle: 'polite',
      explanationLanguage:
        (language === 'en' ||
          language === 'ru' ||
          language === 'uz' ||
          language === 'ko') &&
        tutorLanguageEnabled(language)
          ? language
          : 'en',
      koreanLevel: String(user?.selfReportedLevel ?? user?.level ?? 'beginner'),
      personality: 'friendly',
      characterId: 'female_01',
    };
  }

  async updateSettings(
    userId: string,
    patch: UpdateVoiceTutorSettingsDto,
  ): Promise<TutorSettings> {
    const voices = voiceTutorVoices();
    if (
      patch.voiceId !== undefined &&
      !voices.some((voice) => voice.id === patch.voiceId)
    ) {
      throw new BadRequestException('VOICE_TUTOR_INVALID_VOICE');
    }
    if (
      patch.explanationLanguage &&
      !tutorLanguageEnabled(patch.explanationLanguage)
    ) {
      throw new BadRequestException('VOICE_TUTOR_UNSUPPORTED_LANGUAGE');
    }
    const merged = { ...(await this.getSettings(userId)), ...patch };
    await this.settings.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: merged },
      { upsert: true, new: true },
    );
    return merged;
  }

  async getMemory(userId: string): Promise<StudentMemorySnapshot> {
    const row = await this.memories
      .findOne({ userId: new Types.ObjectId(userId) })
      .lean();
    if (!row) return emptyMemory();
    return {
      summary: row.summary,
      estimatedLevel: row.estimatedLevel,
      grammarMistakes: row.grammarMistakes,
      repeatedMistakes: row.repeatedMistakes,
      recurringMistakes: row.recurringMistakes ?? [],
      learnedVocabulary: row.learnedVocabulary,
      weakVocabulary: row.weakVocabulary,
      strongPoints: row.strongPoints,
      weakPoints: row.weakPoints,
      notes: row.notes,
      lessonsCompleted: row.lessonsCompleted,
    };
  }

  async saveProgress(
    userId: string,
    sessionId: string,
    analyzedTurns: number,
    result: TutorProgress,
  ) {
    const identity = { userId: new Types.ObjectId(userId) };
    const current = await this.getMemory(userId);
    await this.progress.create({
      ...identity,
      sessionId: new Types.ObjectId(sessionId),
      analyzedTurns,
      progress: result,
    });
    const update: StudentMemorySnapshot = {
      summary: result.notes
        ? `${current.summary} ${result.notes}`.trim().slice(-1000)
        : current.summary,
      estimatedLevel: result.estimatedLevel || current.estimatedLevel,
      grammarMistakes: mergeList(
        current.grammarMistakes,
        result.grammarMistakes,
      ),
      repeatedMistakes: mergeList(
        current.repeatedMistakes,
        result.repeatedMistakes,
      ),
      recurringMistakes: current.recurringMistakes,
      learnedVocabulary: mergeList(
        current.learnedVocabulary,
        result.learnedVocabulary,
      ),
      weakVocabulary: mergeList(current.weakVocabulary, result.weakVocabulary),
      strongPoints: mergeList(current.strongPoints, result.strongPoints),
      weakPoints: mergeList(current.weakPoints, result.weakPoints),
      notes: result.notes || current.notes,
      lessonsCompleted: current.lessonsCompleted,
    };
    const progressFields = { ...update };
    delete (progressFields as Partial<StudentMemorySnapshot>).recurringMistakes;
    delete (progressFields as Partial<StudentMemorySnapshot>).lessonsCompleted;
    await this.memories.findOneAndUpdate(
      identity,
      { $set: progressFields },
      { upsert: true },
    );
  }

  async recordCorrection(
    userId: string,
    wrong: string,
    correct: string,
  ): Promise<void> {
    const normalizedWrong = wrong.trim().slice(0, 120);
    const normalizedCorrect = correct.trim().slice(0, 120);
    if (
      !normalizedWrong ||
      !normalizedCorrect ||
      normalizedWrong === normalizedCorrect
    )
      return;
    const current = await this.getMemory(userId);
    const recurringMistakes = current.recurringMistakes.filter(
      (item) =>
        item.wrong !== normalizedWrong || item.correct !== normalizedCorrect,
    );
    const previous = current.recurringMistakes.find(
      (item) =>
        item.wrong === normalizedWrong && item.correct === normalizedCorrect,
    );
    recurringMistakes.push({
      wrong: normalizedWrong,
      correct: normalizedCorrect,
      count: Math.min(99, (previous?.count ?? 0) + 1),
    });
    await this.memories.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: { recurringMistakes: recurringMistakes.slice(-30) } },
      { upsert: true },
    );
  }

  async markLessonComplete(userId: string): Promise<void> {
    await this.memories.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $inc: { lessonsCompleted: 1 } },
      { upsert: true },
    );
  }

  async latestProgress(sessionId: string): Promise<TutorProgress | null> {
    const row = await this.progress
      .findOne({ sessionId: new Types.ObjectId(sessionId) })
      .sort({ analyzedTurns: -1 })
      .lean();
    return row?.progress ?? null;
  }

  async latestPlan(userId: string): Promise<TutorPlan | null> {
    const row = await this.plans
      .findOne({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean();
    return row?.plan ?? null;
  }

  async savePlan(
    userId: string,
    sessionId: string | null,
    plan: TutorPlan,
  ): Promise<void> {
    await this.plans.create({
      userId: new Types.ObjectId(userId),
      fromSessionId: sessionId ? new Types.ObjectId(sessionId) : null,
      plan,
    });
  }
}
