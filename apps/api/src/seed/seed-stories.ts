import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { Story, StoryDocument } from '../stories/schemas/story.schema';
import {
  STORY_COURSE,
  buildStoryDocument,
  isGeneratedAudioFresh,
} from '../stories/story-content.util';
import {
  ENGLISH_STORY_AUDIO,
  ENGLISH_STORY_SEEDS,
} from './data/english-stories';

/**
 * 영어 듣기 이야기 시딩.
 *
 * code 로 덮어쓴다. 시드에서 빠진 이야기는 지우지 않고 isActive 를 내린다
 * (진도가 붙어 있어서). 유저 기록(StoryProgress)은 건드리지 않는다.
 */
async function seedStories() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const storyModel = app.get<Model<StoryDocument>>(getModelToken(Story.name));

  try {
    const codes = ENGLISH_STORY_SEEDS.map((seed) => seed.code);
    await storyModel.updateMany(
      {
        courseId: STORY_COURSE.courseId,
        code: { $nin: codes },
        isActive: true,
      },
      { $set: { isActive: false } },
    );

    let withAudio = 0;
    for (const seed of ENGLISH_STORY_SEEDS) {
      const generated = ENGLISH_STORY_AUDIO[seed.code];
      if (isGeneratedAudioFresh(seed, generated)) withAudio += 1;
      await storyModel.findOneAndUpdate(
        { code: seed.code },
        { $set: buildStoryDocument(seed, generated) },
        { upsert: true, returnDocument: 'after', runValidators: true },
      );
    }

    console.log(
      `🎧 영어 듣기 이야기 ${ENGLISH_STORY_SEEDS.length}편 시딩 완료 ` +
        `(오디오 있음 ${withAudio}편).`,
    );
    if (withAudio < ENGLISH_STORY_SEEDS.length) {
      console.log(
        'ℹ️ 오디오가 없는 이야기는 앱이 문장별 TTS 로 읽는다 — pnpm --filter api story:audio',
      );
    }
  } finally {
    await app.close();
  }
}

seedStories().catch((error) => {
  console.error('❌ 이야기 시딩 실패:', error);
  process.exit(1);
});
