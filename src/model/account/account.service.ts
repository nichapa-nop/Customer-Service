import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>
    ) {}

    public save(account: AccountEntity) {
        return this.accountRepository.save(account);
    }
}
