import { Module } from '@nestjs/common';
import { AccountModule } from 'src/model/account/account.module';
import { AccountManagerService } from './account-manager.service';
import { JwtModule } from '@nestjs/jwt';
import { SendMailModule } from 'src/service/mailer/mailer.module';

@Module({
    imports: [AccountModule, JwtModule, SendMailModule],
    providers: [AccountManagerService],
    exports: [AccountManagerService],
})
export class AccountManagerModule {}
