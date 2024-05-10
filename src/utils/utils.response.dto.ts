import { ApiProperty } from '@nestjs/swagger';

export class AccountResponse {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNum: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    verifyToken: string;
}

export class UpdateAccountResponse {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNum: string;
}

export class RoleResponse {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    roleName: string;

    @ApiProperty()
    priority: number;

    @ApiProperty()
    createdBy: string;

    @ApiProperty()
    updatedBy: string;
}

export class UpdateRoleResponse {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    roleName: string;

    @ApiProperty()
    priority: number;

    @ApiProperty()
    updatedBy: string;
}
