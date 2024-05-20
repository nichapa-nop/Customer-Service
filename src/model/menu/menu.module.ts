import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './entities/menu.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MenuEntity])],
    providers: [MenuService],
    exports: [MenuService],
})
export class MenuModule {}
