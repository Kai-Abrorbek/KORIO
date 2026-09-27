import { Model, mongo } from 'mongoose';
import { VoiceTutorAudioService } from './voice-tutor-audio.service';
import { VoiceTutorAudioDocument } from './schemas/voice-tutor-audio.schema';

describe('VoiceTutorAudioService', () => {
  const userId = '507f1f77bcf86cd799439011';
  const audioId = '507f1f77bcf86cd799439012';

  it('returns the original MP3 bytes from a lean BSON Binary document', async () => {
    const mp3 = Buffer.from([0x49, 0x44, 0x33, 0x04, 0x00, 0x00, 0x00]);
    const lean = jest.fn().mockResolvedValue({ data: new mongo.Binary(mp3) });
    const findOne = jest.fn().mockReturnValue({ lean });
    const service = new VoiceTutorAudioService({
      findOne,
    } as unknown as Model<VoiceTutorAudioDocument>);

    const result = await service.read(userId, audioId);

    expect(result).toEqual(mp3);
    expect(result).toHaveLength(mp3.length);
    expect(findOne).toHaveBeenCalledTimes(1);
  });
});
