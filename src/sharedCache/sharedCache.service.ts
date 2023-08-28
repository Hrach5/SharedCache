import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import buildings from './data/buildings.json';
import checklists from './data/checklists.json';
import members from './data/members.json';
import configurations from './data/configurations.json';

@Injectable()
export class SharedCacheService {
  constructor(private cacheService: RedisService) {}

  async getBuildingCache(projectId: string) {
    const key = `Building${projectId}`;
    let cache = await this.cacheService.get(key);
    if (cache) return cache;

    const data = buildings.buildings;
    cache = data.filter((el) => {
      if (el.id === projectId) {
        return el;
      }
    })[0];

    if (cache) return await this.cacheService.put(key, cache);

    throw new NotFoundException('Building not found');
  }

  async getChecklistCache(projectId: string) {
    const key = `Checklist${projectId}`;
    let cache = await this.cacheService.get(key);
    if (cache) return cache;

    const data = checklists.checklists;
    cache = data.filter((el) => {
      if (el.id === projectId) {
        return el;
      }
    })[0];

    if (cache) return await this.cacheService.put(key, cache);

    throw new NotFoundException('Checklist not found');
  }

  async getMembersCache(projectId: string) {
    const key = `Members${projectId}`;
    let cache = await this.cacheService.get(key);
    if (cache) return cache;

    const data = members.members;
    cache = data.filter((el) => {
      if (el.id === projectId) {
        return el;
      }
    })[0];

    if (cache) return await this.cacheService.put(key, cache);

    throw new NotFoundException('Member not found');
  }

  async getConfigurationsCache(projectId: string) {
    const key = `Configurations${projectId}`;
    let cache = await this.cacheService.get(key);
    if (cache) return cache;

    const data = configurations.configurations;

    cache = data.forms[projectId];

    if (cache) return await this.cacheService.put(key, cache);

    throw new NotFoundException('Configurations not found');
  }
}
