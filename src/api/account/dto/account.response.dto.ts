import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAccountResponseBodyDTO {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    LastName: string;
}
