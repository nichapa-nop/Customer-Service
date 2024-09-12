import { Module } from '@nestjs/common';
import { GroupMenuManagerModule } from 'src/manager/group-menu/group-menu-manager.module';
import { GroupMenuApiController } from './group-menu.controller';

@Module({
    imports: [GroupMenuManagerModule],
    controllers: [GroupMenuApiController],
})
export class GroupMenuApiModule {}
