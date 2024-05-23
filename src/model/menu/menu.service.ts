import { Injectable } from '@nestjs/common';
import { MenuEntity } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(MenuEntity)
        private readonly menuRepository: Repository<MenuEntity>
    ) {}

    public save(menu: MenuEntity) {
        return this.menuRepository.save(menu);
    }

    public getByName(menuName: string) {
        return this.menuRepository.findOneBy({ menuName });
    }

    public getById(id: number) {
        return this.menuRepository.findOneBy({ id });
    }

    public getAll(): Promise<MenuEntity[]> {
        return this.menuRepository.find();
    }

    public delete(id: number) {
        return this.menuRepository.delete({ id });
    }
}
