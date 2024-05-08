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
    password: string;

    @ApiProperty()
    verifyToken: string;

    // @ApiProperty()
    // createDate: Date;
}

export class UpdateAccountResponse {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;
}
