import { Injectable } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        return this.roleRepository.find();
    }

    // public getByUuid(uuid: string) {

    // }
}
