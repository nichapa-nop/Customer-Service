import { BadRequestException, Injectable } from '@nestjs/common';
import {
    CreateMenuRequestBodyDTO,
    GetMenuByNameRequestParamDTO,
    MenuRequestParamDTO,
    UpdateMenuRequestBodyDTO,
} from 'src/api/menu/dto/menu.request';
import { MenuResponseBodyDTO } from 'src/api/menu/dto/menu.response';
import { MenuEntity } from 'src/model/menu/entities/menu.entity';
import { MenuService } from 'src/model/menu/menu.service';

@Injectable()
export class MenuManagerService {
    constructor(private readonly menuService: MenuService) {}

    public async createNewMenu(body: CreateMenuRequestBodyDTO): Promise<MenuResponseBodyDTO> {
        let newMenu = new MenuEntity();
        let newName = await this.menuService.getByName(body.menuName);
        if (!newName) {
            newMenu.create({
                menuName: body.menuName,
                createdBy: body.createdBy,
                updatedBy: body.updatedBy,
            });
        }
        await this.menuService.save(newMenu);
        return { menuDetail: newMenu.toResponse() };
    }

    public async updateMenu(
        param: MenuRequestParamDTO,
        body: UpdateMenuRequestBodyDTO
    ): Promise<MenuResponseBodyDTO> {
        let currentId = await this.menuService.getById(param.id);
        if (!currentId) {
            throw new BadRequestException('ID was incorrect or it does not exist.');
        } else {
            currentId.update({
                menuName: body.menuName,
                updatedBy: body.updatedBy,
            });
            return {
                menuDetail: currentId.toResponse(),
            };
        }
    }

    public async deleteMenu(param: MenuRequestParamDTO) {
        let currentId = await this.menuService.getById(param.id);
        if (!currentId) {
            throw new BadRequestException('Menu was incorrect or it does not exist.');
        } else {
            return await this.menuService.delete(param.id);
        }
    }

    public async getAllMenu() {
        let menus = await this.menuService.getAll();
        return {
            menuDetail: menus.map((menu) => menu.toResponse()),
        };
    }

    public async getMenuByName(param: GetMenuByNameRequestParamDTO): Promise<MenuResponseBodyDTO> {
        let currentName = await this.menuService.getByName(param.menuName);
        if (!currentName) {
            throw new BadRequestException('Menu was incorrect or it does not exist.');
        }
        return { menuDetail: currentName.toResponse() };
    }

    public async getMenuById(param: MenuRequestParamDTO): Promise<MenuResponseBodyDTO> {
        let currentId = await this.menuService.getById(param.id);
        if (!currentId) {
            throw new BadRequestException('Menu was incorrect or it does not exist.');
        }
        return { menuDetail: currentId.toResponse() };
    }
}
