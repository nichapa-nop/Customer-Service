import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateMenuRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    menuName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdBy: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    updatedBy: string;
}
