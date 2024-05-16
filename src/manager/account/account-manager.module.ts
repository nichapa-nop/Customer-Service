import { Module } from '@nestjs/common';
import { AccountModule } from 'src/model/account/account.module';
import { AccountManagerService } from './account-manager.service';
import { JwtModule } from '@nestjs/jwt';
import { SendMailModule } from 'src/service/mailer/mailer.module';
import configService from 'src/config/config.service';
import { RoleModule } from 'src/model/role/role.module';
import { ResetPasswordModule } from 'src/model/reset-pass/reset-pass.module';

@Module({
    imports: [
        AccountModule,
        JwtModule.register({
            global: true,
            secret: configService.getConfig().jwtConstants,
            signOptions: { expiresIn: '24h' },
        }),
        SendMailModule,
        RoleModule,
        ResetPasswordModule,
    ],
    providers: [AccountManagerService],
    exports: [AccountManagerService],
})
export class AccountManagerModule {}
