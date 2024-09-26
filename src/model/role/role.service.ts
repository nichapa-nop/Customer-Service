import { Injectable } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRequestQueryDTO } from 'src/api/role/dto/role.request';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) {}

    public save(role: RoleEntity) {
        return this.roleRepository.save(role);
    }

    public getAll(): Promise<RoleEntity[]> {
        return this.roleRepository.find({ relations: { groupMenu: { bindings: { menu: true } } } });
    }

    public getById(id: number) {
        return this.roleRepository.findOne({
            where: { id },
            relations: { groupMenu: { bindings: { menu: true } } },
        });
    }

    public delete(id: number) {
        return this.roleRepository.delete({ id });
    }

    public getByName(roleName: string) {
        return this.roleRepository.findOneBy({ roleName });
    }

    public getWithPagination(query: RoleRequestQueryDTO) {
        return this.roleRepository.findAndCount({
            take: query.itemsPerPage,
            skip: query.itemsPerPage * (query.page - 1),
            relations: { groupMenu: { bindings: { menu: true } } },
            order: { id: 'DESC' },
            // where,
        });
    }
}
