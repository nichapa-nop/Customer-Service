import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupMenuEntity } from './entities/group-menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupMenuService {
    constructor(
        @InjectRepository(GroupMenuEntity)
        private readonly groupMenuRepository: Repository<GroupMenuEntity>
    ) {}

    public save(groupMenu: GroupMenuEntity) {
        return this.groupMenuRepository.save(groupMenu);
    }

    public getAll(): Promise<GroupMenuEntity[]> {
        return this.groupMenuRepository.find();
    }

    public getById(id: number) {
        return this.groupMenuRepository.findOneBy({ id });
    }

    public delete(id: number) {
        return this.groupMenuRepository.delete({ id });
    }
}
