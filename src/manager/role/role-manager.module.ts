import { Module } from '@nestjs/common';
import { RoleModule } from 'src/model/role/role.module';
import { RoleManagerService } from './role-manager.service';

@Module({
    imports: [RoleModule],
    providers: [RoleManagerService],
    exports: [RoleManagerService],
})
export class RoleManagerModule {}
