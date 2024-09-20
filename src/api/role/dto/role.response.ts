import { ApiProperty } from '@nestjs/swagger';
import { RoleResponse } from 'src/utils/utils.response.dto';

export class RoleResponseBodyDTO {
    @ApiProperty()
    roleDetail: RoleResponse;
}

export class GetRoleListResponseBodyDTO {
    @ApiProperty({ type: RoleResponse, isArray: true })
    getRoleListDetail: RoleResponse[];
}
