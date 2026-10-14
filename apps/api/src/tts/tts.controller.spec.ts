import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ListSpeechVoicesDto } from './dto/list-speech-voices.dto';
import { TtsController } from './tts.controller';
import { TtsService } from './tts.service';

describe('TtsController voice list', () => {
  const validation = new ValidationPipe({ whitelist: true, transform: true });

  it('defaults to Korean and forwards an explicitly selected English locale', async () => {
    const listVoices = jest.fn().mockResolvedValue([]);
    const controller = new TtsController({
      listVoices,
    } as unknown as TtsService);

    await controller.getVoices({});
    await controller.getVoices({ language: 'en-US' });

    expect(listVoices).toHaveBeenNthCalledWith(1, 'ko-KR');
    expect(listVoices).toHaveBeenNthCalledWith(2, 'en-US');
  });

  it.each(['ko-KR', 'uz-UZ', 'en-US', 'ru-RU'])(
    'accepts supported voice locale %s',
    async (language) => {
      const result = (await validation.transform(
        { language },
        { type: 'query', metatype: ListSpeechVoicesDto },
      )) as ListSpeechVoicesDto;

      expect(result.language).toBe(language);
    },
  );

  it.each(['en-GB', '', ['en-US', 'ko-KR']])(
    'rejects unsupported or repeated language query %j',
    async (language) => {
      await expect(
        validation.transform(
          { language },
          { type: 'query', metatype: ListSpeechVoicesDto },
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    },
  );
});
