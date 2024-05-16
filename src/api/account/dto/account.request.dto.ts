import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDefined, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAccountRequestBodyDTO {
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
    phoneNum: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdBy: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    verifyToken: string;
}

export class UpdateAccountRequestBodyDTO {
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
    phoneNum: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    updatedBy: string;
}

export class AccountRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @IsUUID()
    uuid: string;
}

export class LoginUserRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    password: string;
}

export class VerifyTokenRequestParamDTO {
    @ApiProperty()
    // @IsString()
    verifyToken: string;
}

export class AccountResetPassRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    token: string;
}

export class ResetPasswordRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;
}

export class ConfirmResetPasswordRequestBodyDTO {
    @ApiProperty()
    @IsString()
    password: string;
}
