import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Redirect,
    Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GroupMenuManagerService } from 'src/manager/group-menu/group-menu-manager.service';
import {
    CreateGroupMenuRequestBodyDTO,
    GroupMenuRequestParamDTO,
} from './dto/group-menu.request.dto';
import { RequestWithAccount } from 'src/utils/utils.interface';

@ApiTags('Group Menu Mangement')
@Controller()
export class GroupMenuApiController {
    constructor(private readonly groupMenuManagerService: GroupMenuManagerService) {}

    @Get('/v1/group-menu')
    @HttpCode(200)
    @ApiOkResponse()
    public async getAllGroupMenu() {
        try {
            return await this.groupMenuManagerService.getAll();
        } catch (e) {
            throw e;
        }
    }

    @Post('/v1/group-menu')
    @HttpCode(200)
    @ApiOkResponse()
    public async createGroupMenu(
        @Body() body: CreateGroupMenuRequestBodyDTO,
        @Req() req: RequestWithAccount
    ) {
        try {
            return await this.groupMenuManagerService.createGroupMenu(body);
        } catch (e) {
            throw e;
        }
    }

    @Delete('/v1/group-menu/:id')
    @HttpCode(200)
    @ApiOkResponse()
    public async deleteGroupMenu(@Param() param: GroupMenuRequestParamDTO) {
        return await this.groupMenuManagerService.deleteGroupMenu(param);
    }
}
