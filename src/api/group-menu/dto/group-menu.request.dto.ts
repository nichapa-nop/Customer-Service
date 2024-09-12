import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsDefined,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { MenuPermission } from 'src/model/group-menu/entities/group-menu.binding.entity';

export class GroupMenuRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    name: string;
}

export class GroupMenuRequestParamDTO {
    @ApiProperty()
    @IsDefined()
    @IsNumber()
    id: number;
}

export class BindingMenuRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsNumber()
    menuId: number;

    @ApiProperty({ enum: MenuPermission, isArray: true })
    @IsDefined()
    @IsArray()
    @IsEnum(MenuPermission, { each: true })
    permissions: MenuPermission[];
}

export class CreateGroupMenuRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    name: string;

    @ApiProperty({ type: BindingMenuRequestBodyDTO, isArray: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BindingMenuRequestBodyDTO)
    menus: BindingMenuRequestBodyDTO[];
}
