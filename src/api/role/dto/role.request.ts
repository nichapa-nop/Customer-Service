import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoleRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    roleName: string;

    @ApiProperty()
    @IsDefined()
    @IsNumber()
    groupMenuId: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdBy: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    updatedBy: string;
}

export class RoleRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    id: number;
}

export class UpdateRoleRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    roleName: string;

    @ApiProperty()
    @IsDefined()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    groupMenuId: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    updatedBy: string;
}

export class RoleRequestQueryDTO {
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
