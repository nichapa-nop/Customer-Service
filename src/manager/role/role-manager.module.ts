import { Module } from '@nestjs/common';
import { RoleModule } from 'src/model/role/role.module';
import { RoleManagerService } from './role-manager.service';
import { GroupMenuModule } from 'src/model/group-menu/group-menu.module';

@Module({
    imports: [RoleModule, GroupMenuModule],
    providers: [RoleManagerService],
    exports: [RoleManagerService],
})
export class RoleManagerModule {}
