import { ApiProperty } from '@nestjs/swagger';

export class MailRequestBodyDTO {
    @ApiProperty()
    to: string;

    @ApiProperty()
    from: string;

    @ApiProperty()
    subject: string;

    @ApiProperty()
    text: string;
}
