import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class AccountRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    password: string;
}
