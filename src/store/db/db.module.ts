import { Module } from '@nestjs/common';
import { AccountDatabaseModule } from './accountdb/accountdb.module';

@Module({
    imports: [AccountDatabaseModule],
})
export class DatabaseModule {}
