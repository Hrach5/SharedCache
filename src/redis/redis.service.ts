import { Injectable } from '@nestjs/common';
import { RedisService as Redis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisService {
	constructor(private readonly redisClient: Redis) {}

	async deleteLessUsedData(keys: string[]) {
		const firstData = JSON.parse(await this.redisClient.getClient().get(keys[0]));
		let key = keys[0];

		keys.shift();

		for (let i = 0; i < keys.length; i++) {
			const data = JSON.parse(await this.redisClient.getClient().get(keys[i]));

			if (data.count <= firstData.count) {
				firstData.count = data.count;
				key = keys[i];
			}
		}

		await this.redisClient.getClient().del(key);
	}

	async put(key: string, value: any): Promise<boolean> {
		const data = {
			...value,
			count: 1
		};

		const keys = await this.redisClient.getClient().keys('*', (err, keys) => {
			return keys;
		});

		if (keys.length >= 16) this.deleteLessUsedData(keys);

		await this.redisClient.getClient().set(key, JSON.stringify(data));

		await this.redisClient.getClient().expire(key, +process.env.REDIS_CACHE_TTL || 3600);

		return data;
	}

	async get(key: string): Promise<any> {
		const result = await this.redisClient.getClient().get(key);

		if (!result) {
			return null;
		}

		const cachedData = JSON.parse(result);
		cachedData.count++;
		this.redisClient.getClient().set(key, JSON.stringify(cachedData));

		return cachedData;
	}
}
