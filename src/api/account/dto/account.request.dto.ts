import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsDefined,
    IsEmail,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
// import { CompanyType } from 'src/model/account/entities/account.entity';

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
    @IsString()
    firstNameTh: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    lastNameTh: string;

    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    phoneNum: string;

    // @ApiProperty()
    // @IsDefined()
    // @IsString()
    // password: string;

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
    @IsString()
    firstNameTh: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    lastNameTh: string;

    @ApiProperty()
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    phoneNum: string;

    // @ApiProperty()
    // @IsDefined()
    // @IsString()
    // type: CompanyType;

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

export class AccountRequestQueryDTO {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    page: number = 1;

    @ApiProperty({ required: false })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    itemsPerPage: number = 6;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    keyword?: string;
}
