import { Module } from '@nestjs/common';
import { RoleManagerModule } from 'src/manager/role/role-manager.module';
import { RoleApiController } from './role.controller';

@Module({
    imports: [RoleManagerModule],
    controllers: [RoleApiController],
})
export class RoleApiModule {}
