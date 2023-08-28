import { Module } from '@nestjs/common';
import { SharedCacheController } from './sharedCache.controller';
import { SharedCacheService } from './sharedCache.service';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [],
  controllers: [SharedCacheController],
  providers: [SharedCacheService, RedisService],
})
export class SharedCacheModule {}
