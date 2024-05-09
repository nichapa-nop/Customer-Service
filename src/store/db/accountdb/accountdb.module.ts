import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from 'src/config/config.service';
import { AccountEntity } from 'src/model/account/entities/account.entity';
import { RoleEntity } from 'src/model/role/entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            ...configService.getConfig().database,
            entities: [AccountEntity, RoleEntity],
            synchronize: true,
        }),
    ],
})
export class AccountDatabaseModule {}
