import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { SaveSurveyDto } from './dto/save-survey.dto';
import { SaveLevelTestDto } from './dto/save-level-test.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  // 설문조사 저장
  @Post('survey')
  async saveSurvey(@Body() dto: SaveSurveyDto) {
    return this.onboardingService.saveSurvey(dto);
  }

  // 레벨 테스트 결과 저장
  @Post('level-test')
  async saveLevelTest(@Body() dto: SaveLevelTestDto) {
    return this.onboardingService.saveLevelTest(dto);
  }

  // 비로그인 학습 진도 업데이트
  @Patch('guest-progress/:sessionId')
  async updateGuestProgress(@Param('sessionId') sessionId: string) {
    return this.onboardingService.updateGuestProgress(sessionId);
  }

  // 세션 데이터 가져오기 (로그인 후 이어서 학습)
  @Get('session/:sessionId')
  async getSessionData(@Param('sessionId') sessionId: string) {
    return this.onboardingService.getSessionData(sessionId);
  }
}
