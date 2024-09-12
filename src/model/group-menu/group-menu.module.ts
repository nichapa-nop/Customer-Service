import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMenuEntity } from './entities/group-menu.entity';
import { GroupMenuService } from './group-menu.service';
import { GroupMenuBindingEntity } from './entities/group-menu.binding.entity';

@Module({
    imports: [TypeOrmModule.forFeature([GroupMenuEntity, GroupMenuBindingEntity])],
    providers: [GroupMenuService],
    exports: [GroupMenuService],
})
export class GroupMenuModule {}
