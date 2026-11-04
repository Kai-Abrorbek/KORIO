import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/schemas/user.schema';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import {
  StoryProgress,
  StoryProgressSchema,
} from './schemas/story-progress.schema';
import { Story, StorySchema } from './schemas/story.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Story.name, schema: StorySchema },
      { name: StoryProgress.name, schema: StoryProgressSchema },
      { name: User.name, schema: UserSchema },
    ]),
    LessonsModule,
    UsersModule,
  ],
  controllers: [StoriesController],
  providers: [StoriesService],
  // 따라 읽기 평가(SpeechModule)가 참조 문장을 찾고 통과를 기록한다
  exports: [StoriesService],
})
export class StoriesModule {}
