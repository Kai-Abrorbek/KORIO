import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RequirePermission } from '../admin/decorators/require-permission.decorator';
import { AdminGuard } from '../admin/guards/admin.guard';
import { AppReviewService } from './app-review.service';

@Controller('admin/app-reviews')
@UseGuards(AdminGuard)
@RequirePermission('users:read')
export class AdminAppReviewController {
  constructor(private readonly reviews: AppReviewService) {}

  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('rating') rating?: string,
  ) {
    return this.reviews.listForAdmin({ page, pageSize, rating });
  }
}
