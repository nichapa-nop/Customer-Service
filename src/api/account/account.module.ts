import { Module } from '@nestjs/common';
import { AccountManagerModule } from 'src/manager/account/account-manager.module';
import { AccountApiController } from './account.controller';

@Module({
    imports: [AccountManagerModule],
    controllers: [AccountApiController],
})
export class AccountApiModule {}
