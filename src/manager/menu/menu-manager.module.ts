import { Module } from '@nestjs/common';
import { MenuModule } from 'src/model/menu/menu.module';
import { MenuManagerService } from './menu-manager.service';

@Module({
    imports: [MenuModule],
    providers: [MenuManagerService],
    exports: [MenuManagerService],
})
export class MenuManagerModule {}
