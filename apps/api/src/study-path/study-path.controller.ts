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

@UseGuards(JwtAuthGuard)
@Controller('study-path')
export class StudyPathController {
  constructor(private readonly studyPathService: StudyPathService) {}

  /** 학습 로드 모드 로드맵 — 현재 섹션의 하루(=유닛)들 */
  @Get()
  async getStudyPath(@Request() req, @Query('lang') lang = 'uz') {
    return this.studyPathService.getStudyPath(req.user._id.toString(), lang);
  }

  /** 고를 수 있는 급수 목록 (콘텐츠 없는 급은 available:false) */
  @Get('levels')
  async getLevels(@Request() req, @Query('lang') lang = 'uz') {
    return this.studyPathService.getLevels(req.user._id.toString(), lang);
  }

  /** 급수 직접 선택 */
  @Post('levels')
  async setLevel(@Request() req, @Body() dto: SetStudyLevelDto) {
    return this.studyPathService.setLevel(req.user._id.toString(), dto.level);
  }

  /** 급수 졸업 시험 문제 */
  @Get('level-exam')
  async getLevelExam(@Request() req, @Query('lang') lang = 'uz') {
    return this.studyPathService.getLevelExam(req.user._id.toString(), lang);
  }

  /** 졸업 시험 결과. 떨어져도 다음 급은 열린다 */
  @Post('level-exam/complete')
  async completeLevelExam(@Request() req, @Body() dto: CompleteLevelExamDto) {
    return this.studyPathService.completeLevelExam(
      req.user._id.toString(),
      dto,
    );
  }

  /** 노드의 레슨 하나를 끝냈을 때 */
  @Post('complete')
  async complete(@Request() req, @Body() dto: CompleteStudyNodeDto) {
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
    );
  }
}
