import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AccountRequestBodyDTO } from 'src/api/account/dto/account.request.dto';
import { AccountService } from 'src/model/account/account.service';
import { AccountEntity } from 'src/model/account/entities/account.entity';

@Injectable()
export class AccountManagerService {
    constructor(private readonly accountService: AccountService) {}

    public async createNewAccount(body: AccountRequestBodyDTO) {
        let newAccount = new AccountEntity();
        newAccount.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: await hash(body.password, 10),
        });
        return await this.accountService.save(newAccount);
    }
}
