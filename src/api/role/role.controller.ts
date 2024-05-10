import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleManagerService } from 'src/manager/role/role-manager.service';

@ApiTags('Role Management')
@Controller()
export class RoleApiController {
    constructor(private readonly roleManagerService: RoleManagerService) {}
}
