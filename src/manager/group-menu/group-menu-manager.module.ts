import { Module } from '@nestjs/common';
import { GroupMenuManagerService } from './group-menu-manager.service';
import { GroupMenuModule } from 'src/model/group-menu/group-menu.module';

@Module({
    imports: [GroupMenuModule],
    providers: [GroupMenuManagerService],
    exports: [GroupMenuManagerService],
})
export class GroupMenuManagerModule {}
