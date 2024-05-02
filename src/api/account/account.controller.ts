import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountManagerService } from 'src/manager/account/account-manager.service';
import {
    CreateAccountRequestBodyDTO,
    AccountRequestParamDTO,
    LoginUserRequestBodyDTO,
    UpdateAccountRequestBodyDTO,
} from './dto/account.request.dto';
import {
    AccountResponseBodyDTO,
    GetAccountListResponseBodyDTO,
    LoginUserResponseBodyDTO,
    UpdateAccountResponseBodyDTO,
} from './dto/account.response.dto';
import { AccountResponse, UpdateAccountResponse } from 'src/utils/utils.response.dto';

@ApiTags('Account Management')
@Controller()
export class AccountApiController {
    constructor(private readonly accountManagerservice: AccountManagerService) {}

    @Post('/v1/account')
    @HttpCode(200)
    @ApiResponse({ type: AccountResponseBodyDTO })
    public async createAccount(@Body() body: CreateAccountRequestBodyDTO): Promise<AccountResponseBodyDTO> {
        return await this.accountManagerservice.createNewAccount(body);
    }

    @Get('/v1/account')
    @HttpCode(200)
    @ApiResponse({ type: GetAccountListResponseBodyDTO })
    public async getAllAccount() {
        return await this.accountManagerservice.getAllAccount();
    }

    @Get('/v1/account/:uuid')
    @HttpCode(200)
    @ApiResponse({ type: AccountResponseBodyDTO })
    public async getAccount(@Param() param: AccountRequestParamDTO) {
        return await this.accountManagerservice.getAccount(param);
    }

    @Put('/v1/account/:uuid')
    @HttpCode(200)
    @ApiResponse({ type: UpdateAccountResponseBodyDTO })
    public async updateAccount(
        @Param() param: AccountRequestParamDTO,
        @Body() body: UpdateAccountRequestBodyDTO
    ): Promise<UpdateAccountResponseBodyDTO> {
        return await this.accountManagerservice.updateAccount(param, body);
    }

    @Delete('/v1/account/:uuid')
    public async deleteAccount(@Param() param: AccountRequestParamDTO) {
        return await this.accountManagerservice.deleteAccount(param);
    }

    @Post('/v1/login')
    @HttpCode(200)
    @ApiOkResponse({ type: LoginUserResponseBodyDTO })
    public async login(@Body() body: LoginUserRequestBodyDTO, @Res() res: Response): Promise<void> {
        const response = await this.accountManagerservice.loginAccount(body);
    }
}
