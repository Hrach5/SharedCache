import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { SharedCacheModule } from './sharedCache/sharedCache.module';

@Module({
  imports: [ConfigModule.forRoot(), RedisModule, SharedCacheModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
