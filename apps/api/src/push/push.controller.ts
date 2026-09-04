import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { PushService } from './push.service';
import {
  AnnounceDto,
  PreviewPushDto,
  PushSettingsDto,
  RegisterDeviceDto,
  TestPushDto,
  UnregisterDeviceDto,
} from './dto/push.dto';
import { PushType } from './push.types';
import { PushSchedulerService } from './push-scheduler.service';

@Controller('push')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PushController {
  constructor(
    private readonly push: PushService,
    private readonly scheduler: PushSchedulerService,
  ) {}

  /** 앱이 푸시 토큰을 받으면 여기로. 로그인할 때마다 다시 부른다 */
  @Post('register')
  register(@Request() req, @Body() dto: RegisterDeviceDto) {
    return this.push.register(req.user._id.toString(), dto);
  }

  /** 로그아웃·알림 끄기 */
  @Post('unregister')
  unregister(@Request() req, @Body() dto: UnregisterDeviceDto) {
    return this.push.unregister(req.user._id.toString(), dto.token);
  }

  /** 알림 스위치·시간·언어 */
  @Patch('settings')
  settings(@Request() req, @Body() dto: PushSettingsDto) {
    return this.push.updateSettings(req.user._id.toString(), dto);
  }

  /**
   * 내 폰으로 테스트 발송.
   * type 을 주면 그 종류로, 안 주면 재미 유도 문구가 간다.
   * 설정·한도·중복을 전부 무시한다 — 확인용이라 막히면 안 된다.
   */
  @Post('test')
  test(@Request() req, @Body() dto: TestPushDto) {
    return this.push.sendTest(
      req.user._id.toString(),
      (dto.type as PushType) ?? PushType.ENGAGE,
      dto.params ?? {},
      dto.rotation,
    );
  }

  /** 내 기기 등록 상태. 푸시가 왜 안 오는지 볼 때 여기부터 */
  @Get('status')
  status(@Request() req) {
    return this.push.deviceStatus(req.user._id.toString());
  }

  /**
   * 보내지 않고 "지금(또는 N시에) 나에게 뭐가 갈지" 만 본다.
   * 슬롯·우선순위 규칙을 하루 기다리지 않고 확인하는 용도.
   */
  @Post('preview')
  preview(@Request() req, @Body() dto: PreviewPushDto) {
    return this.scheduler.preview(req.user._id.toString(), dto.hour);
  }

  /** 매시 크론을 지금 손으로 돌린다. ⚠️ 실제로 발송된다 */
  @Post('run-scheduler')
  @Roles(UserRole.ADMIN)
  runScheduler() {
    return this.scheduler.runNow();
  }

  /**
   * 전체 공지 (신규 기능 안내 등).
   *
   * ⚠️ 되돌릴 수 없다. 한 번 나가면 전 유저 폰에서 울린다.
   * key 로 중복을 막지만, 문구는 보내기 전에 반드시 test 로 확인할 것.
   */
  @Post('announce')
  @Roles(UserRole.ADMIN)
  announce(@Body() dto: AnnounceDto) {
    return this.push.announce(dto);
  }
}
