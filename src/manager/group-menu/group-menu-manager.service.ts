import { Injectable } from '@nestjs/common';
import { GroupMenuEntity } from 'src/model/group-menu/entities/group-menu.entity';

@Injectable()
export class GroupMenuManagerService {
    // constructor(private readonly groupMenuService: GroupMenuService) {}

    public async createGroupMenu() {
        let newGroupMenu = new GroupMenuEntity();
    }
}
