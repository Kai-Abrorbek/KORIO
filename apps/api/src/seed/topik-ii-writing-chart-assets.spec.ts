import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  TOPIK_II_35_WRITING_SEED,
  TOPIK_II_36_WRITING_SEED,
  TOPIK_II_37_WRITING_SEED,
  TOPIK_II_41_WRITING_SEED,
  TOPIK_II_47_WRITING_SEED,
  TOPIK_II_52_WRITING_SEED,
  TOPIK_II_60_WRITING_SEED,
  TOPIK_II_64_WRITING_SEED,
  TOPIK_II_83_WRITING_SEED,
  TOPIK_II_91_WRITING_SEED,
  TOPIK_II_96_WRITING_SEED,
  TOPIK_II_102_WRITING_SEED,
} from './data/topik';
import { TopikExamSeed } from './data/topik/topik-seed.types';
import { validateTopikWritingSeed } from './validate-topik-seed';
import { withTopikWritingChartImage } from '../topik/topik-writing-chart-image';

const workspaceRoot = resolve(__dirname, '../../../..');
const writingSeeds: [number, TopikExamSeed][] = [
  [35, TOPIK_II_35_WRITING_SEED],
  [36, TOPIK_II_36_WRITING_SEED],
  [37, TOPIK_II_37_WRITING_SEED],
  [41, TOPIK_II_41_WRITING_SEED],
  [47, TOPIK_II_47_WRITING_SEED],
  [52, TOPIK_II_52_WRITING_SEED],
  [60, TOPIK_II_60_WRITING_SEED],
  [64, TOPIK_II_64_WRITING_SEED],
  [83, TOPIK_II_83_WRITING_SEED],
  [91, TOPIK_II_91_WRITING_SEED],
  [96, TOPIK_II_96_WRITING_SEED],
  [102, TOPIK_II_102_WRITING_SEED],
];

describe.each(writingSeeds)(
  'TOPIK II %i회 쓰기 53번 원본 도표',
  (round, seed) => {
    it('시드가 유효하고 모바일·텔레그램 이미지가 동일하다', () => {
      validateTopikWritingSeed(seed);
      const question = seed.questions.find((item) => item.number === 53);
      const chart = question?.stimulus;
      expect(chart?.chart).toBeDefined();

      const imageUrl = chart?.imageUrl;
      expect(imageUrl).toBe(`/topik/writing/topik-ii-${round}-q53.png`);
      if (!question || !chart || !imageUrl) {
        throw new Error(`${round}회 쓰기 53번 그림 경로 없음`);
      }
      expect(
        withTopikWritingChartImage(question.code, { ...chart, imageUrl: '' })
          ?.imageUrl,
      ).toBe(imageUrl);

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
    });
  },
);
