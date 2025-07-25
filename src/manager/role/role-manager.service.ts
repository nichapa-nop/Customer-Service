import { BadRequestException, Injectable } from '@nestjs/common';
import {
    CreateRoleRequestBodyDTO,
    RoleRequestParamDTO,
    RoleRequestQueryDTO,
    UpdateRoleRequestBodyDTO,
} from 'src/api/role/dto/role.request';
import { RoleResponseBodyDTO } from 'src/api/role/dto/role.response';
import { GroupMenuService } from 'src/model/group-menu/group-menu.service';
import { RoleEntity } from 'src/model/role/entities/role.entity';
import { RoleService } from 'src/model/role/role.service';
import { RequestWithAccount } from 'src/utils/utils.interface';

@Injectable()
export class RoleManagerService {
    constructor(
        private readonly roleService: RoleService,
        private readonly groupMenuService: GroupMenuService
    ) {}

    public async createNewRole(
        body: CreateRoleRequestBodyDTO,
        req: RequestWithAccount
    ): Promise<RoleResponseBodyDTO> {
        let newRole = new RoleEntity();
        let roleName = await this.roleService.getByName(body.roleName);
        let groupMenu = await this.groupMenuService.getById(body.groupMenuId);
        if (!groupMenu) {
            throw new BadRequestException('Group Menu was incorrect or it does not exist');
        }
        if (!roleName) {
            newRole.create({
                roleName: body.roleName,
                groupMenu,
                // priority: body.priority,
                createdBy: req.reqAccount.uuid,
            });
            let role = await this.roleService.save(newRole);
            return { roleDetail: role.toResponse() };
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
        let role = await this.roleService.getById(param.id);
        if (!role) {
            throw new BadRequestException('UUID was incorrect or it does not exist.');
        }
        return { roleDetail: role.toResponse() };
    }

    public async updateRole(
        param: RoleRequestParamDTO,
        body: UpdateRoleRequestBodyDTO,
        req: RequestWithAccount
    ): Promise<RoleResponseBodyDTO> {
        let currentRole = await this.roleService.getById(param.id);
        if (!currentRole) {
            throw new BadRequestException('ID was incorrect or it does not exist.');
        }
        let groupMenu = await this.groupMenuService.getById(body.groupMenuId);
        if (!groupMenu) {
            throw new BadRequestException('Group Menu was incorrect or it does not exist');
        }
        currentRole.update({
            roleName: body.roleName,
            groupMenu,
            // priority: body.priority,
            updatedBy: req.reqAccount.uuid,
        });
        let role = await this.roleService.save(currentRole);

        return {
            roleDetail: role.toResponse(),
        };
    }

    public async deleteRole(param: RoleRequestParamDTO) {
        let currentRole = await this.roleService.getById(param.id);
        if (!currentRole) {
            throw new BadRequestException('Role was incorrect or does not exist.');
        } else {
            return await this.roleService.delete(param.id);
        }
    }

    public async getWithPagination(query: RoleRequestQueryDTO) {
        let [roles, count] = await this.roleService.getWithPagination(query);
        return {
            roles: roles.map((role) => role.toResponse()),
            pagination: { page: query.page, itemsPerPage: query.itemsPerPage, itemsCount: count },
        };
    }
}
