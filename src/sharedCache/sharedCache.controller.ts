import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SharedCacheService } from './sharedCache.service';

@Controller('/')
@ApiTags('SharedCache')
export class SharedCacheController {
  constructor(private readonly sharedCacheService: SharedCacheService) {}

  @Get('/v1/structure')
  async getBuildingCache(
    @Query('projectId') projectId: string,
    @Query('locationType') locationType: string,
  ) {
    return this.sharedCacheService.getBuildingCache(projectId);
  }

  @Get('/v2/checklists')
  async getChecklistCache(@Query('projectId') projectId: string) {
    return this.sharedCacheService.getChecklistCache(projectId);
  }

  @Get('/v1/project')
  async getMembersCache(
    @Query('projectId') projectId: string,
    @Query('fields') fields: string,
  ) {
    return this.sharedCacheService.getMembersCache(projectId);
  }

  @Get('/v1/configurations')
  async getConfigurationsCache(@Query('projectId') projectId: string) {
    return this.sharedCacheService.getConfigurationsCache(projectId);
  }
}
