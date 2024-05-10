import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleRequestBodyDTO, RoleRequestParamDTO, UpdateRoleRequestBodyDTO } from 'src/api/role/dto/role.request';
import { RoleResponseBodyDTO, UpdateRoleResponseBodyDTO } from 'src/api/role/dto/role.response';
import { RoleEntity } from 'src/model/role/entities/role.entity';
import { RoleService } from 'src/model/role/role.service';

@Injectable()
export class RoleManagerService {
    constructor(private readonly roleService: RoleService) {}

    public async createNewRole(body: CreateRoleRequestBodyDTO): Promise<RoleResponseBodyDTO> {
        let newRole = new RoleEntity();
        let roleName = await this.roleService.getByName(body.roleName);
        if (!roleName) {
            newRole.create({
                roleName: body.roleName,
                priority: body.priority,
                createdBy: body.createdBy,
            });
            return { roleDetail: newRole.toResponse() };
        } else {
            throw new BadRequestException('This role is already exist.');
        }
    }

    public async getAllRole() {
        let roles = await this.roleService.getAll();
        return {
            roleDetail: roles.map((role) => role.toResponse()),
        };
    }

    public async getRole(param: RoleRequestParamDTO) {
        let role = await this.roleService.getByUuid(param.uuid);
        if (!role) {
            throw new BadRequestException('UUID was incorrect or it does not exist.');
        }
        return { roleDetail: role.toResponse() };
    }

    public async updateRole(
        param: RoleRequestParamDTO,
        body: UpdateRoleRequestBodyDTO
    ): Promise<UpdateRoleResponseBodyDTO> {
        let currentRole = await this.roleService.getByUuid(param.uuid);
        if (!currentRole) {
            throw new BadRequestException('UUID was incorrect or it does not exist.');
        } else {
            currentRole.update({
                roleName: body.roleName,
                priority: body.priority,
                updatedBy: body.updatedBy,
            });
            return {
                updateRoleDetail: currentRole.toResponse(),
            };
        }
    }

    public async deleteRole(param: RoleRequestParamDTO) {
        let currentRole = await this.roleService.getByUuid(param.uuid);
        if (!currentRole) {
            throw new BadRequestException('Role was incorrect or does not exist.');
        } else {
            return await this.roleService.delete(param.uuid);
        }
    }
}
