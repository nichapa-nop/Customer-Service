import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    menuName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    createdBy: string;

    // @ApiProperty()
    // @IsOptional()
    // @IsString()
    // updatedBy: string;
}

export class UpdateMenuRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    menuName: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    updatedBy: string;
}

export class MenuRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @IsNumber()
    id: number;
}

export class GetMenuByNameRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    menuName: string;
}
