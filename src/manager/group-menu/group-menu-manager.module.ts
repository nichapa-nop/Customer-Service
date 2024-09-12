import { Module } from '@nestjs/common';
import { GroupMenuManagerService } from './group-menu-manager.service';
import { GroupMenuModule } from 'src/model/group-menu/group-menu.module';
import { MenuModule } from 'src/model/menu/menu.module';

@Module({
    imports: [GroupMenuModule, MenuModule],
    providers: [GroupMenuManagerService],
    exports: [GroupMenuManagerService],
})
export class GroupMenuManagerModule {}
