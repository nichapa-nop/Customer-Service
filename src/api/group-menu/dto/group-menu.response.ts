import { ApiProperty } from '@nestjs/swagger';
import { GroupMenuResponse } from 'src/utils/utils.response.dto';

export class GroupMenuResponseBodyDTO {
    @ApiProperty()
    groupMenuDetail: GroupMenuResponse;
}

export class GetGroupMenuListResponseBodyDTO {
    @ApiProperty({ type: GroupMenuResponse, isArray: true })
    groupMenus: GroupMenuResponse[];
}
