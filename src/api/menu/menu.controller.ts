import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenuResponseBodyDTO } from './dto/menu.response';
import {
    CreateMenuRequestBodyDTO,
    GetMenuByNameRequestParamDTO,
    MenuRequestParamDTO,
    UpdateMenuRequestBodyDTO,
} from './dto/menu.request';
import { MenuManagerService } from 'src/manager/menu/menu-manager.service';

@ApiTags('Menu Manager')
@Controller()
export class MenuApiController {
    constructor(private readonly menuManagerService: MenuManagerService) {}

    @Post('/v1/menu')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async createMenu(@Body() body: CreateMenuRequestBodyDTO) {
        return await this.menuManagerService.createNewMenu(body);
    }

    @Put('/v1/menu/:id')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async updateMenu(
        @Param() param: MenuRequestParamDTO,
        @Body() body: UpdateMenuRequestBodyDTO
    ) {
        return await this.menuManagerService.updateMenu(param, body);
    }

    @Delete('/v1/menu/:id')
    @HttpCode(200)
    // @ApiResponse
    public async deleteMenu(@Param() param: MenuRequestParamDTO) {
        return await this.menuManagerService.deleteMenu(param);
    }

    @Get('/v1/menu')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async getAllMenu() {
        return await this.menuManagerService.getAllMenu();
    }

    @Get('/v1/menu:id')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async getMenuById(@Param() param: MenuRequestParamDTO) {
        return await this.menuManagerService.getMenuById(param);
    }

    @Get('/v1/menu/:menuName')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async getMenuByName(@Param() param: GetMenuByNameRequestParamDTO) {
        return await this.menuManagerService.getMenuByName(param);
    }
}
