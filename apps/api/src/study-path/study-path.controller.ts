import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudyPathService } from './study-path.service';
import { CompleteStudyNodeDto } from './dto/complete-study-node.dto';
import { SetStudyLevelDto } from './dto/set-study-level.dto';
import { CompleteLevelExamDto } from './dto/complete-level-exam.dto';
import {
  type CourseScope,
  resolveCourseScope,
} from '../common/learning-course';

@UseGuards(JwtAuthGuard)
@Controller('study-path')
export class StudyPathController {
  constructor(private readonly studyPathService: StudyPathService) {}

  /** 학습 로드 모드 로드맵 — 현재 섹션의 하루(=유닛)들 */
  @Get()
  async getStudyPath(
    @Request() req,
    @Query('lang') lang = 'uz',
    @Query() course: Partial<CourseScope> = {},
  ) {
    return this.studyPathService.getStudyPath(
      req.user._id.toString(),
      lang,
      resolveCourseScope(course),
    );
  }

  /**
   * 학습 로드 모드 스코어.
   * 자유 학습의 /lessons/score 와 값이 다르다 — 두 모드는 진도를 각각 다른
   * 곳에 쌓는다. 같은 엔드포인트를 쓰면 한쪽 진도가 다른 쪽 숫자를 올린다.
   */
  @Get('score')
  async getScore(
    @Request() req,
    @Query('lang') lang = 'uz',
    @Query() course: Partial<CourseScope> = {},
  ) {
    return this.studyPathService.getScore(
      req.user._id.toString(),
      lang,
      resolveCourseScope(course),
    );
  }

  /** 고를 수 있는 급수 목록 (콘텐츠 없는 급은 available:false) */
  @Get('levels')
  async getLevels(
    @Request() req,
    @Query('lang') lang = 'uz',
    @Query() course: Partial<CourseScope> = {},
  ) {
    return this.studyPathService.getLevels(
      req.user._id.toString(),
      lang,
      resolveCourseScope(course),
    );
  }

  /** 급수 직접 선택 */
  @Post('levels')
  async setLevel(
    @Request() req,
    @Body() dto: SetStudyLevelDto,
    @Query() course: Partial<CourseScope> = {},
  ) {
    return this.studyPathService.setLevel(
      req.user._id.toString(),
      dto.level,
      resolveCourseScope(course),
    );
  }

  /** 급수 졸업 시험 문제 */
  @Get('level-exam')
  async getLevelExam(
    @Request() req,
    @Query('lang') lang = 'uz',
    @Query('level') level?: string,
    @Query() course: Partial<CourseScope> = {},
  ) {
    // level: 급수 화면에서 잠긴 급을 열려고 볼 때 그 아래 급. 없으면 지금 급
    const examLevel = Number(level) || undefined;
    return this.studyPathService.getLevelExam(
      req.user._id.toString(),
      lang,
      examLevel,
      resolveCourseScope(course),
    );
  }

  /** 졸업 시험 결과. **합격해야만** 다음 급으로 간다 */
  @Post('level-exam/complete')
  async completeLevelExam(
    @Request() req,
    @Body() dto: CompleteLevelExamDto,
    @Query() course: Partial<CourseScope> = {},
  ) {
    return this.studyPathService.completeLevelExam(
      req.user._id.toString(),
      dto,
      resolveCourseScope(course),
    );
  }

  /** 노드의 레슨 하나를 끝냈을 때 */
  @Post('complete')
  async complete(
    @Request() req,
    @Body() dto: CompleteStudyNodeDto,
    @Query() course: Partial<CourseScope> = {},
  ) {
    if (dto.section < 1 || dto.unit < 1) {
      throw new BadRequestException('INVALID_UNIT_SCOPE');
    }
    return this.studyPathService.completeNode(
      req.user._id.toString(),
      dto.section,
      dto.unit,
      dto.kind,
      dto.group ?? 1,
      dto.lesson ?? 1,
      resolveCourseScope(course),
    );
  }
}
