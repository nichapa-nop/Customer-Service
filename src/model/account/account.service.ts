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

    public getAll(): Promise<AccountEntity[]> {
        return this.accountRepository.find();
    }

    public getByUuid(uuid: string) {
        return this.accountRepository.findOneBy({ uuid });
    }

    public getByEmail(email: string) {
        return this.accountRepository.findOneBy({ email });
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
