import { Module } from '@nestjs/common';
import { AccountModule } from 'src/model/account/account.module';
import { AccountService } from 'src/model/account/account.service';
import { AccountManagerService } from './account-manager.service';

@Module({
    imports: [AccountModule],
    providers: [AccountManagerService],
    exports: [AccountManagerService],
})
export class AccountManagerModule {}
