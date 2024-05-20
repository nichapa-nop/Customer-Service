import { ApiProperty } from '@nestjs/swagger';
import { MenuResponse } from 'src/utils/utils.response.dto';

export class MenuResponseBodyDTO {
    @ApiProperty()
    menuDetail: MenuResponse;
}
