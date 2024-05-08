import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountManagerService } from 'src/manager/account/account-manager.service';
import {
    CreateAccountRequestBodyDTO,
    AccountRequestParamDTO,
    LoginUserRequestBodyDTO,
    UpdateAccountRequestBodyDTO,
    VerifyTokenRequestParamDTO,
} from './dto/account.request.dto';
import {
    AccountResponseBodyDTO,
    GetAccountListResponseBodyDTO,
    LoginUserResponseBodyDTO,
    UpdateAccountResponseBodyDTO,
} from './dto/account.response.dto';
import configService from 'src/config/config.service';
import { Response } from 'express';

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
    @ApiBearerAuth()
    public async getAllAccount() {
        return await this.accountManagerservice.getAllAccount();
    }

    @Get('/v1/account/:uuid')
    @HttpCode(200)
    @ApiResponse({ type: AccountResponseBodyDTO })
    @ApiBearerAuth()
    public async getAccount(@Param() param: AccountRequestParamDTO) {
        return await this.accountManagerservice.getAccount(param);
    }

    @Put('/v1/account/:uuid')
    @HttpCode(200)
    @ApiResponse({ type: UpdateAccountResponseBodyDTO })
    @ApiBearerAuth()
    public async updateAccount(
        @Param() param: AccountRequestParamDTO,
        @Body() body: UpdateAccountRequestBodyDTO
    ): Promise<UpdateAccountResponseBodyDTO> {
        return await this.accountManagerservice.updateAccount(param, body);
    }

    @Delete('/v1/account/:uuid')
    @ApiBearerAuth()
    public async deleteAccount(@Param() param: AccountRequestParamDTO) {
        return await this.accountManagerservice.deleteAccount(param);
    }

    @Get('/v1/verify-email/:verifyToken')
    @HttpCode(200)
    @ApiOkResponse()
    public async verifyToken(@Param() param: VerifyTokenRequestParamDTO) {
        console.log(param);
        return await this.accountManagerservice.verifyToken(param.verifyToken);
    }

    @Post('/v1/login')
    @HttpCode(200)
    @ApiOkResponse({ type: LoginUserResponseBodyDTO })
    public async login(@Body() body: LoginUserRequestBodyDTO, @Res() res: Response): Promise<void> {
        const response = await this.accountManagerservice.loginAccount(body);
        console.log(response);
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + configService.getConfig().jwtExpiration);
        res.status(200)
            .cookie('access-token', response.accessToken, {
                secure: true,
                httpOnly: true,
                expires,
                sameSite: true,
            })
            .send(response);
        // console.log(res.getHeaders());
    }
}
