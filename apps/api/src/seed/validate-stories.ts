import { existsSync } from 'fs';
import { join } from 'path';
import { validateStorySeeds } from '../stories/story-content.util';
import {
  ENGLISH_STORY_AUDIO,
  ENGLISH_STORY_SEEDS,
} from './data/english-stories';

/**
 * 영어 듣기 이야기 시드 검증 (DB 없이 돈다).
 *   pnpm --filter api seed:validate-stories
 *
 * 오디오는 앱 번들(apps/mobile/assets/audio/stories)에 있어야 한다. 본문이 바뀌어
 * 오디오가 낡았으면 실패한다 — 그대로 내보내면 엉뚱한 단어에 불이 켜진다.
 */
const MOBILE_AUDIO_DIR = join(
  __dirname,
  '../../../mobile/assets/audio/stories',
);

const report = validateStorySeeds(
  ENGLISH_STORY_SEEDS,
  ENGLISH_STORY_AUDIO,
  (key) => existsSync(join(MOBILE_AUDIO_DIR, `${key}.mp3`)),
);

for (const warning of report.warnings) console.warn(`⚠️  ${warning}`);
for (const error of report.errors) console.error(`❌ ${error}`);

if (report.errors.length > 0) {
  console.error(`\n이야기 시드 오류 ${report.errors.length}개.`);
  process.exit(1);
}
console.log(
  `✅ 영어 듣기 이야기 ${ENGLISH_STORY_SEEDS.length}편 검증 통과` +
    (report.warnings.length ? ` (경고 ${report.warnings.length})` : ''),
);
