import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    NestRedisModule.forRoot({
      closeClient: true,
      config: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
  ],
  exports: [NestRedisModule],
})
export class RedisModule {}
