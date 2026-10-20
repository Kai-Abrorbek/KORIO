import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SavePronunciationDto } from './save-pronunciation.dto';

describe('SavePronunciationDto language compatibility', () => {
  const validation = new ValidationPipe({ whitelist: true, transform: true });
  const result = { level: 'lv1', step: 1, mode: 'easy', score: 80 };

  it('accepts legacy requests without a language', async () => {
    const dto = (await validation.transform(result, {
      type: 'body',
      metatype: SavePronunciationDto,
    })) as SavePronunciationDto;

    expect(dto).toMatchObject(result);
    expect(dto.targetLanguage).toBeUndefined();
  });

  it.each(['ko', 'en'])(
    'preserves the explicit %s language through whitelist validation',
    async (targetLanguage) => {
      const dto = (await validation.transform(
        { ...result, targetLanguage },
        { type: 'body', metatype: SavePronunciationDto },
      )) as SavePronunciationDto;

      expect(dto.targetLanguage).toBe(targetLanguage);
    },
  );

  it.each(['ko-KR', 'en-US', 'fr', '', 'en.lv1', ['en'], null, 1])(
    'rejects unsupported or malformed language %j',
    async (targetLanguage) => {
      await expect(
        validation.transform(
          { ...result, targetLanguage },
          { type: 'body', metatype: SavePronunciationDto },
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    },
  );
});
