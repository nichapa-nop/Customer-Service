import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountManagerService } from 'src/manager/account/account-manager.service';
import { AccountRequestBodyDTO } from './dto/account.request.dto';

@ApiTags('Account Management')
@Controller()
export class AccountApiController {
    constructor(private readonly accountManagerservice: AccountManagerService) {}

    @Post('/v1/account')
    public async createAccount(@Body() body: AccountRequestBodyDTO) {
        return await this.accountManagerservice;
    }
}
