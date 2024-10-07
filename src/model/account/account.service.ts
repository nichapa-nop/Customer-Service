import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { query } from 'express';
import { AccountRequestQueryDTO } from 'src/api/account/dto/account.request.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>
    ) {}

    public save(account: AccountEntity) {
        return this.accountRepository.save(account);
    }

    public getAll(): Promise<AccountEntity[]> {
        return this.accountRepository.find();
    }

    public getByUuid(uuid: string) {
        return this.accountRepository.findOne({
            where: { uuid },
            relations: { role: { groupMenu: { bindings: { menu: true } } } },
        });
    }

    public getByEmail(email: string) {
        return this.accountRepository.findOneBy({ email });
    }

    public isEmailExist(email: string) {
        return this.accountRepository.exists({ where: { email } });
    }

    public getWithPagination(query: AccountRequestQueryDTO) {
        let where: FindOptionsWhere<AccountEntity>[] = [];
        if (query.keyword) {
            where.push({
                firstName: ILike(`%${query.keyword}%`),
            });
            where.push({
                lastName: ILike(`%${query.keyword}%`),
            });
            where.push({
                email: ILike(`%${query.keyword}%`),
            });
            where.push({
                phoneNum: ILike(`%${query.keyword}%`),
            });
            where.push({
                role: [{ roleName: ILike(`%${query.keyword}%`) }],
            });
        }
        return this.accountRepository.findAndCount({
            take: query.itemsPerPage,
            skip: query.itemsPerPage * (query.page - 1),
            relations: { role: { groupMenu: true } },
            order: { uuid: 'DESC' },
            where,
        });
    }

    public delete(uuid: string) {
        return this.accountRepository.delete({ uuid });
    }

    public getByToken(verifyToken: string) {
        return this.accountRepository.findOneBy({ verifyToken });
    }

    public randomString(lenght) {
        return Math.random().toString(36).substring(2, lenght);
    }
}
