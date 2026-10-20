/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */

import { Types } from 'mongoose';
import { SpeechService } from './speech.service';
import { SpeechController } from './speech.controller';

function query(value: any) {
  return {
    select: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue(value),
  };
}

describe('course-aware speech recognition', () => {
  const userId = new Types.ObjectId().toString();
  const questionId = new Types.ObjectId().toString();

  function fixture(targetLanguage?: string) {
    const question = {
      answer: targetLanguage === 'en' ? 'Hello' : '안녕하세요',
      ...(targetLanguage
        ? { targetLanguage, courseId: `${targetLanguage}-general` }
        : {}),
    };
    const service: any = new (SpeechService as any)(
      {},
      { findById: jest.fn(() => query(question)) },
      { findOne: jest.fn(() => query({ section: 1 })) },
    );
    jest.spyOn(service, 'validateWav').mockImplementation(() => undefined);
    jest
      .spyOn(service, 'audioStats')
      .mockReturnValue({ seconds: 1, peakPct: 30, rms: 1 });
    jest.spyOn(service, 'recognize').mockResolvedValue({
      status: 'success',
      text: question.answer,
      scores: {
        pron: 90,
        accuracy: 90,
        fluency: 90,
        completeness: 100,
        prosody: null,
      },
      words: [],
    });
    return service;
  }

  it('derives English assessment locale from stored question metadata', async () => {
    const service = fixture('en');
    const result = await service.assess(userId, questionId, Buffer.alloc(1));
    expect(service.recognize).toHaveBeenCalledWith(
      expect.any(Buffer),
      'Hello',
      true,
      'en-US',
    );
    expect(result.passed).toBe(true);
  });

  it('keeps legacy question assessment in Korean', async () => {
    const service = fixture();
    await service.assess(userId, questionId, Buffer.alloc(1));
    expect(service.recognize).toHaveBeenCalledWith(
      expect.any(Buffer),
      '안녕하세요',
      true,
      'ko-KR',
    );
  });

  it('accepts English transcription without overriding the Korean default', async () => {
    const service = fixture('en');
    await service.transcribe(userId, Buffer.alloc(1), 'en');
    expect(service.recognize).toHaveBeenLastCalledWith(
      expect.any(Buffer),
      undefined,
      false,
      'en-US',
    );
    await service.transcribe(userId, Buffer.alloc(1));
    expect(service.recognize).toHaveBeenLastCalledWith(
      expect.any(Buffer),
      undefined,
      false,
      'ko-KR',
    );
  });

  it('rejects unsupported speech languages before making a paid recognition request', async () => {
    const service = fixture();
    await expect(
      service.transcribe(userId, Buffer.alloc(1), 'xx'),
    ).rejects.toThrow('UNSUPPORTED_SPEECH_LANGUAGE');
    expect(service.recognize).not.toHaveBeenCalled();
  });

  it('forwards only the explicit transcription language query', () => {
    const service = { transcribe: jest.fn() };
    const controller = new SpeechController(service as any);
    const req = { body: Buffer.alloc(1), user: { _id: userId } } as any;
    void controller.transcribe(req, 'en');
    expect(service.transcribe).toHaveBeenCalledWith(userId, req.body, 'en');
  });
});
// Exercise real services without initializing circular Mongo schema decorators.
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual('@nestjs/mongoose'),
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));
