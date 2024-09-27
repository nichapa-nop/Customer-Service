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
    Query,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleManagerService } from 'src/manager/role/role-manager.service';
import { GetRoleListResponseBodyDTO, RoleResponseBodyDTO } from './dto/role.response';
import {
    CreateRoleRequestBodyDTO,
    RoleRequestParamDTO,
    RoleRequestQueryDTO,
    UpdateRoleRequestBodyDTO,
} from './dto/role.request';
import { RequestWithAccount } from 'src/utils/utils.interface';
import { verifyPermission } from 'src/utils/utils.function';
import { MenuPermission } from 'src/model/group-menu/entities/group-menu.binding.entity';

@ApiTags('Role Management')
@Controller()
@ApiBearerAuth()
export class RoleApiController {
    constructor(private readonly roleManagerService: RoleManagerService) {}

    @Post('/v1/role')
    @HttpCode(200)
    @ApiResponse({ type: RoleResponseBodyDTO })
    public async createRole(
        @Body() body: CreateRoleRequestBodyDTO,
        @Req() req: RequestWithAccount
    ): Promise<RoleResponseBodyDTO> {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'role', MenuPermission.CREATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        console.log(body);
        return await this.roleManagerService.createNewRole(body, req);
    }

    @Get('v1/role')
    @HttpCode(200)
    @ApiResponse({ type: GetRoleListResponseBodyDTO })
    public async getAllRole(@Query() query: RoleRequestQueryDTO, @Req() req: RequestWithAccount) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'role', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.roleManagerService.getWithPagination(query);
    }

    @Get('/v1/role/:id')
    @HttpCode(200)
    @ApiResponse({ type: RoleResponseBodyDTO })
    public async getRole(@Param() param: RoleRequestParamDTO, @Req() req: RequestWithAccount) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'role', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.roleManagerService.getRole(param);
    }

    @Put('/v1/role/:id')
    @HttpCode(200)
    @ApiResponse({ type: RoleResponseBodyDTO })
    public async updateRole(
        @Param() param: RoleRequestParamDTO,
        @Body() body: UpdateRoleRequestBodyDTO,
        @Req() req: RequestWithAccount
    ): Promise<RoleResponseBodyDTO> {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'role', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.roleManagerService.updateRole(param, body, req);
    }

    @Delete('/v1/role/:id')
    public async deleteRole(@Param() param: RoleRequestParamDTO, @Req() req: RequestWithAccount) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'role', MenuPermission.DELETE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.roleManagerService.deleteRole(param);
    }
}
