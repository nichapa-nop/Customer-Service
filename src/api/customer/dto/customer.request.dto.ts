import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { CompanyType } from 'src/model/customer/entities/customer.entity';

export class CustomerRequestBodyDTO {
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
    companyName: string;

    @ApiProperty()
    @IsEnum(CompanyType)
    @IsDefined()
    type: CompanyType;
}

export class CustomerRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @IsNumber()
    id: number;
}
