import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class GroupMenuRequestBodyDTO {
    @ApiProperty()
    @IsDefined()
    @IsString()
    name: string;
}
