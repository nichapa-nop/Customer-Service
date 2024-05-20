import { Module } from '@nestjs/common';
import { MenuService } from 'src/model/menu/menu.service';
import { MenuApiController } from './menu.controller';

@Module({
    imports: [MenuService],
    controllers: [MenuApiController],
})
export class MenuApiModule {}
