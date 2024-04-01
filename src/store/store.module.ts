import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import { CacheModule } from './cache/cache.module';

@Module({
    imports: [DatabaseModule, CacheModule],
})
export class DataStoreModule {}
