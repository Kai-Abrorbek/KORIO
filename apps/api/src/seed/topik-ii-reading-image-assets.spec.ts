import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  TOPIK_II_35_READING_SEED,
  TOPIK_II_36_READING_SEED,
  TOPIK_II_37_READING_SEED,
  TOPIK_II_41_READING_SEED,
  TOPIK_II_47_READING_SEED,
  TOPIK_II_52_READING_SEED,
  TOPIK_II_60_READING_SEED,
  TOPIK_II_64_READING_SEED,
  TOPIK_II_83_READING_SEED,
  TOPIK_II_91_READING_SEED,
  TOPIK_II_96_READING_SEED,
  TOPIK_II_102_READING_SEED,
} from './data/topik';
import { TopikExamSeed } from './data/topik/topik-seed.types';
import {
  validateTopikII35ReadingSeed,
  validateTopikII83ReadingSeed,
} from './validate-topik-seed';

const workspaceRoot = resolve(__dirname, '../../../..');
const readingSeeds: [number, TopikExamSeed][] = [
  [35, TOPIK_II_35_READING_SEED],
  [36, TOPIK_II_36_READING_SEED],
  [37, TOPIK_II_37_READING_SEED],
  [41, TOPIK_II_41_READING_SEED],
  [47, TOPIK_II_47_READING_SEED],
  [52, TOPIK_II_52_READING_SEED],
  [60, TOPIK_II_60_READING_SEED],
  [64, TOPIK_II_64_READING_SEED],
  [83, TOPIK_II_83_READING_SEED],
  [91, TOPIK_II_91_READING_SEED],
  [96, TOPIK_II_96_READING_SEED],
  [102, TOPIK_II_102_READING_SEED],
];

describe.each(readingSeeds)(
  'TOPIK II %i회 읽기 9·10번 원본 시각 자료',
  (round, seed) => {
    it('시드가 유효하고 모바일·텔레그램 이미지가 동일하다', () => {
      const validate =
        round >= 83
          ? validateTopikII83ReadingSeed
          : validateTopikII35ReadingSeed;
      validate(seed);

      for (const number of [9, 10]) {
        const question = seed.questions.find((item) => item.number === number);
        const imageUrl = question?.stimulus?.imageUrl;
        expect(imageUrl).toBe(
          `/topik/reading/topik-ii-${round}-q${String(number).padStart(2, '0')}.png`,
        );
        expect(question?.stimulus?.imageAlt).toContain(`${number}번 원본`);
        if (!imageUrl) {
          throw new Error(`${round}회 읽기 ${number}번 그림 경로 없음`);
        }

        const mobileImage = readFileSync(
          join(workspaceRoot, 'apps/mobile/assets/images', imageUrl.slice(1)),
        );
        const telegramImage = readFileSync(
          join(workspaceRoot, 'apps/telegram-app/public', imageUrl.slice(1)),
        );
        expect(mobileImage.subarray(0, 8)).toEqual(
          Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
        );
        expect(mobileImage).toEqual(telegramImage);
      }
    });
  },
);
