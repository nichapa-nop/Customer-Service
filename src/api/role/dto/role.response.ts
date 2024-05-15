import { ApiProperty } from '@nestjs/swagger';
import { RoleResponse, UpdateRoleResponse } from 'src/utils/utils.response.dto';

export class RoleResponseBodyDTO {
    @ApiProperty()
    roleDetail: RoleResponse;
}

export class UpdateRoleResponseBodyDTO {
    @ApiProperty()
    updateRoleDetail: UpdateRoleResponse;
}

export class GetRoleListResponseBodyDTO {
    @ApiProperty({ type: RoleResponse, isArray: true })
    getRoleListDetail: RoleResponse[];
}
