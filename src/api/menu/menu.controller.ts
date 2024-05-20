import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenuResponseBodyDTO } from './dto/menu.response';
import { CreateMenuRequestBodyDTO } from './dto/menu.request';

@ApiTags('Menu Manager')
@Controller()
export class MenuApiController {
    // constructor(private readonly menuManagerService: ) {}

    @Post('/v1/menu')
    @HttpCode(200)
    @ApiResponse({ type: MenuResponseBodyDTO })
    public async createMenu(@Body() body: CreateMenuRequestBodyDTO) {
        // return await this.menuManagerService.()
    }
}
