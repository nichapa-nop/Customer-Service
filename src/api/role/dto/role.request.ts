import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoleRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    roleName: string;

    @ApiProperty()
    @IsDefined()
    @IsNumber()
    priority: number;

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
    @IsNumber()
    priority: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    updatedBy: string;
}
