import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { RateLimitGuard } from '../common/rate-limit';
import { VoiceTutorAgentsService } from './agents/voice-tutor-agents.service';
import { VoiceTutorProfileService } from './memory/voice-tutor-profile.service';
import { ElevenLabsTutorTtsProvider } from './providers/elevenlabs-tts.provider';
import { OpenAiTutorLlmProvider } from './providers/openai-llm.provider';
import { OpenAiSttProvider } from './providers/openai-stt.provider';
import {
  VoiceTutorAudio,
  VoiceTutorAudioSchema,
} from './schemas/voice-tutor-audio.schema';
import {
  VoiceTutorMemory,
  VoiceTutorMemorySchema,
} from './schemas/voice-tutor-memory.schema';
import {
  VoiceTutorMessage,
  VoiceTutorMessageSchema,
} from './schemas/voice-tutor-message.schema';
import {
  VoiceTutorPlan,
  VoiceTutorPlanSchema,
} from './schemas/voice-tutor-plan.schema';
import {
  VoiceTutorProgress,
  VoiceTutorProgressSchema,
} from './schemas/voice-tutor-progress.schema';
import {
  VoiceTutorSession,
  VoiceTutorSessionSchema,
} from './schemas/voice-tutor-session.schema';
import {
  VoiceTutorSettings,
  VoiceTutorSettingsSchema,
} from './schemas/voice-tutor-settings.schema';
import { VoiceTutorAudioService } from './voice-tutor-audio.service';
import { VoiceTutorController } from './voice-tutor.controller';
import { VoiceTutorService } from './voice-tutor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: VoiceTutorSettings.name, schema: VoiceTutorSettingsSchema },
      { name: VoiceTutorSession.name, schema: VoiceTutorSessionSchema },
      { name: VoiceTutorMessage.name, schema: VoiceTutorMessageSchema },
      { name: VoiceTutorMemory.name, schema: VoiceTutorMemorySchema },
      { name: VoiceTutorPlan.name, schema: VoiceTutorPlanSchema },
      { name: VoiceTutorProgress.name, schema: VoiceTutorProgressSchema },
      { name: VoiceTutorAudio.name, schema: VoiceTutorAudioSchema },
    ]),
  ],
  controllers: [VoiceTutorController],
  providers: [
    VoiceTutorService,
    VoiceTutorProfileService,
    VoiceTutorAgentsService,
    VoiceTutorAudioService,
    OpenAiSttProvider,
    OpenAiTutorLlmProvider,
    ElevenLabsTutorTtsProvider,
    RateLimitGuard,
  ],
})
export class VoiceTutorModule {}
