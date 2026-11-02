import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AdminAuditService } from '../admin-audit.service';
import { RequirePermission } from '../decorators/require-permission.decorator';
import { AdminGuard } from '../guards/admin.guard';
import type { AdminRequestContext } from '../guards/admin.guard';
import { WordCollectionsService } from '../../word-collections/word-collections.service';
import {
  WordCollectionsQueryDto,
  WriteWordCollectionDto,
} from '../../word-collections/dto/word-collections.dto';

interface CollectionAdminRequest {
  admin: AdminRequestContext;
  ip?: string;
}

@Controller('admin/content/word-collections')
@UseGuards(AdminGuard)
@RequirePermission('content:read')
export class AdminWordCollectionsController {
  constructor(
    private readonly collections: WordCollectionsService,
    private readonly audit: AdminAuditService,
  ) {}

  @Get()
  list(@Query() query: WordCollectionsQueryDto) {
    return this.collections.adminList(query);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.collections.adminGet(id);
  }

  @Post()
  @RequirePermission('content:write')
  async create(
    @Request() req: CollectionAdminRequest,
    @Body() body: WriteWordCollectionDto,
  ) {
    const result = await this.collections.create(body);
    await this.audit.record({
      admin: req.admin,
      action: 'word_collection.create',
      targetType: 'word_collection',
      targetId: result.id,
      targetLabel: body.title.ko,
      ip: req.ip,
    });
    return result;
  }

  @Put(':id')
  @RequirePermission('content:write')
  async replace(
    @Request() req: CollectionAdminRequest,
    @Param('id') id: string,
    @Body() body: WriteWordCollectionDto,
  ) {
    const result = await this.collections.replace(id, body);
    await this.audit.record({
      admin: req.admin,
      action: 'word_collection.update',
      targetType: 'word_collection',
      targetId: id,
      targetLabel: body.title.ko,
      ip: req.ip,
    });
    return result;
  }

  /** Archive metadata only; never delete source words, membership positions or SRS. */
  @Delete(':id')
  @RequirePermission('content:write')
  async archive(
    @Request() req: CollectionAdminRequest,
    @Param('id') id: string,
  ) {
    const result = await this.collections.archive(id);
    await this.audit.record({
      admin: req.admin,
      action: 'word_collection.archive',
      targetType: 'word_collection',
      targetId: id,
      ip: req.ip,
    });
    return result;
  }
}
