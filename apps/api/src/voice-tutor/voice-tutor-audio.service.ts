import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  VoiceTutorAudio,
  VoiceTutorAudioDocument,
} from './schemas/voice-tutor-audio.schema';

const AUDIO_LIFETIME_MS = 60 * 60 * 1000;

@Injectable()
export class VoiceTutorAudioService {
  constructor(
    @InjectModel(VoiceTutorAudio.name)
    private readonly audio: Model<VoiceTutorAudioDocument>,
  ) {}

  async store(userId: string, data: Buffer): Promise<string> {
    const row = await this.audio.create({
      userId: new Types.ObjectId(userId),
      data,
      expiresAt: new Date(Date.now() + AUDIO_LIFETIME_MS),
    });
    return `/voice-tutor/audio/${row._id.toString()}`;
  }

  async read(userId: string, audioId: string): Promise<Buffer> {
    if (!Types.ObjectId.isValid(audioId))
      throw new NotFoundException('VOICE_TUTOR_AUDIO_NOT_FOUND');
    const row = await this.audio
      .findOne({
        _id: new Types.ObjectId(audioId),
        userId: new Types.ObjectId(userId),
        expiresAt: { $gt: new Date() },
      })
      .lean();
    if (!row) throw new NotFoundException('VOICE_TUTOR_AUDIO_NOT_FOUND');
    return Buffer.from(row.data);
  }
}
