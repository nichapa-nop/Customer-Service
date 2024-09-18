import { BadRequestException, Injectable } from '@nestjs/common';
import { error } from 'console';
import {
    CreateGroupMenuRequestBodyDTO,
    GroupMenuRequestParamDTO,
    UpdateGroupMenuRequestBodyDTO,
} from 'src/api/group-menu/dto/group-menu.request.dto';
import { GroupMenuBindingEntity } from 'src/model/group-menu/entities/group-menu.binding.entity';
import { GroupMenuEntity } from 'src/model/group-menu/entities/group-menu.entity';
import { GroupMenuService } from 'src/model/group-menu/group-menu.service';
import { MenuService } from 'src/model/menu/menu.service';

@Injectable()
export class GroupMenuManagerService {
    constructor(
        private readonly groupMenuService: GroupMenuService,
        private readonly menuService: MenuService
    ) {}

    public async createGroupMenu(body: CreateGroupMenuRequestBodyDTO) {
        let menus = await this.menuService.getByIds(body.menus.map((menu) => menu.menuId));
        if (menus.length !== body.menus.length) {
            throw new BadRequestException('Some menus are incorrect or its do not exist');
        }
        let newGroupMenu = new GroupMenuEntity();
        newGroupMenu.name = body.name;
        newGroupMenu.bindings = body.menus.map((menu) => {
            let targetMenu = menus.find((m) => m.id === menu.menuId);
            let newMenuBinding = new GroupMenuBindingEntity();
            newMenuBinding.menu = targetMenu;
            newMenuBinding.permissions = menu.permissions;
            return newMenuBinding;
        });
        let groupMenu = await this.groupMenuService.save(newGroupMenu);
        return groupMenu;
    }

    public async updateGroupMenu(
        body: UpdateGroupMenuRequestBodyDTO,
        param: GroupMenuRequestParamDTO
    ) {
        let currentGroup = await this.groupMenuService.getById(param.id);
        if (!currentGroup) {
            throw new BadRequestException('Group Menu was incorrect or it does not exist.');
        }
        //update group menu function
        // let menus = await this.menuService.getById()
    }

    public async deleteGroupMenu(param: GroupMenuRequestParamDTO) {
        let currentGroup = await this.groupMenuService.getById(param.id);
        if (!currentGroup) {
            throw new BadRequestException('Group Menu was incorrect or it does not exist.');
        }
        return await this.groupMenuService.delete(param.id);
    }
}
