import { Module } from '@nestjs/common';
import { MenuService } from 'src/model/menu/menu.service';
import { MenuApiController } from './menu.controller';
import { MenuManagerModule } from 'src/manager/menu/menu-manager.module';

@Module({
    imports: [MenuManagerModule],
    controllers: [MenuApiController],
})
export class MenuApiModule {}
