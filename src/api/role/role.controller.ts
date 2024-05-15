import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleManagerService } from 'src/manager/role/role-manager.service';
import { GetRoleListResponseBodyDTO, RoleResponseBodyDTO, UpdateRoleResponseBodyDTO } from './dto/role.response';
import { CreateRoleRequestBodyDTO, RoleRequestParamDTO, UpdateRoleRequestBodyDTO } from './dto/role.request';

@ApiTags('Role Management')
@Controller()
@ApiBearerAuth()
export class RoleApiController {
    constructor(private readonly roleManagerService: RoleManagerService) {}

    @Post('/v1/role')
    @HttpCode(200)
    @ApiResponse({ type: RoleResponseBodyDTO })
    public async createRole(@Body() body: CreateRoleRequestBodyDTO): Promise<RoleResponseBodyDTO> {
        return await this.roleManagerService.createNewRole(body);
    }

    @Get('v1/role')
    @HttpCode(200)
    @ApiResponse({ type: GetRoleListResponseBodyDTO })
    public async getAllRole() {
        return await this.roleManagerService.getAllRole();
    }

    @Get('/v1/role/:uuid')
    @HttpCode(200)
    @ApiResponse({ type: RoleResponseBodyDTO })
    public async getRole(@Param() param: RoleRequestParamDTO) {
        return await this.roleManagerService.getRole(param);
    }

    @Put('/v1/role/:uuid')
    @HttpCode(200)
    @ApiResponse({ type: UpdateRoleResponseBodyDTO })
    public async updateRole(
        @Param() param: RoleRequestParamDTO,
        @Body() body: UpdateRoleRequestBodyDTO
    ): Promise<UpdateRoleResponseBodyDTO> {
        return await this.roleManagerService.updateRole(param, body);
    }

    @Delete('/v1/role/:uuid')
    public async deleteRole(@Param() param: RoleRequestParamDTO) {
        return await this.roleManagerService.deleteRole(param);
    }
}
