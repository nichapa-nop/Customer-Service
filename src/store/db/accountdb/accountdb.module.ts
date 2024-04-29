import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from 'src/config/config.service';
import { AccountEntity } from 'src/model/account/entities/account.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            ...configService.getConfig().database,
            entities: [AccountEntity],
            synchronize: true,
        }),
    ],
})
export class AccountDatabaseModule {}
