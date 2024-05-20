import { Injectable } from '@nestjs/common';
import { CreateMenuRequestBodyDTO } from 'src/api/menu/dto/menu.request';
import { MenuEntity } from 'src/model/menu/entities/menu.entity';
import { MenuService } from 'src/model/menu/menu.service';

@Injectable()
export class MenuManagerService {
    constructor(private readonly menuService: MenuService) {}
    public async createNewMenu(body: CreateMenuRequestBodyDTO) {
        let newMenu = new MenuEntity();
        let newName = await this.menuService.getByName(body.menuName);
        if (!newName) {
            newMenu.create({
                menuName: body.menuName,
                createdBy: body.createdBy,
                updatedBy: body.updatedBy,
            });
        }
        return await this.menuService.save(newMenu);
    }
}
