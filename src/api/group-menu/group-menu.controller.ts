import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GroupMenuManagerService } from 'src/manager/group-menu/group-menu-manager.service';
import { CreateGroupMenuRequestBodyDTO } from './dto/group-menu.request.dto';

@ApiTags('Group Menu Mangement')
@Controller()
export class GroupMenuApiController {
    constructor(private readonly groupMenuManagerService: GroupMenuManagerService) {}

    @Post('/v1/group-menu')
    @HttpCode(200)
    @ApiOkResponse()
    public async createGroupMenu(@Body() body: CreateGroupMenuRequestBodyDTO) {
        try {
            return await this.groupMenuManagerService.createGroupMenu(body);
        } catch (e) {
            throw e;
        }
    }
}
