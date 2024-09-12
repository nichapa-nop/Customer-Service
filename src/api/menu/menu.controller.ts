import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenuResponseBodyDTO } from './dto/menu.response';
import {
    CreateMenuRequestBodyDTO,
    GetMenuByNameRequestParamDTO,
    MenuRequestParamDTO,
    UpdateMenuRequestBodyDTO,
} from './dto/menu.request';
import { MenuManagerService } from 'src/manager/menu/menu-manager.service';
import { verifyPermission } from 'src/utils/utils.function';
import { MenuPermission } from 'src/model/group-menu/entities/group-menu.binding.entity';
import { RequestWithAccount } from 'src/utils/utils.interface';

@ApiTags('Menu Management')
@Controller()
@ApiBearerAuth()
export class MenuApiController {
    constructor(private readonly menuManagerService: MenuManagerService) {}

    @Post('/v1/menu')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async createMenu(
        @Body() body: CreateMenuRequestBodyDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'menu', MenuPermission.CREATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.menuManagerService.createNewMenu(body, req);
    }

    @Put('/v1/menu/:id')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async updateMenu(
        @Param() param: MenuRequestParamDTO,
        @Body() body: UpdateMenuRequestBodyDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'menu', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.menuManagerService.updateMenu(param, body, req);
    }

    @Delete('/v1/menu/:id')
    @HttpCode(200)
    // @ApiResponse
    public async deleteMenu(@Param() param: MenuRequestParamDTO, @Req() req: RequestWithAccount) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'menu', MenuPermission.DELETE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.menuManagerService.deleteMenu(param);
    }

    @Get('/v1/menu')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async getAllMenu(@Req() req: RequestWithAccount) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'menu', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.menuManagerService.getAllMenu();
    }

    @Get('/v1/menu:id')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async getMenuById(@Param() param: MenuRequestParamDTO, @Req() req: RequestWithAccount) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'menu', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.menuManagerService.getMenuById(param);
    }

    @Get('/v1/menu/:menuName')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async getMenuByName(
        @Param() param: GetMenuByNameRequestParamDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'menu', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.menuManagerService.getMenuByName(param);
    }
}
