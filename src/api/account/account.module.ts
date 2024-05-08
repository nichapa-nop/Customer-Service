import { Module } from '@nestjs/common';
import { AccountManagerModule } from 'src/manager/account/account-manager.module';
import { AccountApiController } from './account.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [AccountManagerModule],
    controllers: [AccountApiController],
})
export class AccountApiModule {}
