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

@UseGuards(JwtAuthGuard)
@Controller('study-path')
export class StudyPathController {
  constructor(private readonly studyPathService: StudyPathService) {}

  /** 학습 로드 모드 로드맵 — 현재 섹션의 하루(=유닛)들 */
  @Get()
  async getStudyPath(@Request() req, @Query('lang') lang = 'uz') {
    return this.studyPathService.getStudyPath(req.user._id.toString(), lang);
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
      dto.lesson ?? 1,
    );
  }
}
