import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReadingGlossService } from '../reading-lessons/reading-gloss.service';
import {
  TopikQuestionGroup,
  TopikQuestionGroupDocument,
} from './schemas/topik-question-group.schema';
import {
  TopikQuestion,
  TopikQuestionDocument,
} from './schemas/topik-question.schema';
import { topikVisibleText } from './topik-visible-text.util';

/**
 * TOPIK 연습 화면의 단어 뜻보기 (단어를 두 번 누르면).
 *
 * 읽기·듣기 학습의 뜻보기(ReadingGlossService)를 그대로 쓴다. 저장 단위는 **문제 묶음**
 * (`topik:<묶음 id>`) — 누군가 한 번 찾아본 단어는 저장돼서, 같은 지문을 보는 다음
 * 사람부터는 모델을 부르지 않고 바로 나간다. 처음 한 번만 잠깐 기다린다.
 */
@Injectable()
export class TopikGlossService {
  constructor(
    @InjectModel(TopikQuestionGroup.name)
    private readonly groupModel: Model<TopikQuestionGroupDocument>,
    @InjectModel(TopikQuestion.name)
    private readonly questionModel: Model<TopikQuestionDocument>,
    private readonly glossService: ReadingGlossService,
  ) {}

  async glossWord(questionId: string, word: string) {
    if (!Types.ObjectId.isValid(questionId)) {
      throw new NotFoundException('TOPIK_QUESTION_NOT_FOUND');
    }
    const question = await this.questionModel
      .findOne({ _id: new Types.ObjectId(questionId), isActive: true })
      .select('groupId')
      .lean();
    if (!question) throw new NotFoundException('TOPIK_QUESTION_NOT_FOUND');

    const [group, questions] = await Promise.all([
      this.groupModel
        .findById(question.groupId)
        .select('sharedStimulus sharedAudio')
        .lean(),
      this.questionModel
        .find({ groupId: question.groupId, isActive: true })
        .select('prompt stimulus audio choices')
        .lean(),
    ]);
    const text = topikVisibleText(group, questions);
    const gloss = await this.glossService.resolve(
      `topik:${question.groupId.toString()}`,
      word,
      text,
    );
    return { gloss };
  }
}
