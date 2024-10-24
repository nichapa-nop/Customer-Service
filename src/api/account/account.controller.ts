import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountManagerService } from 'src/manager/account/account-manager.service';
import {
    CreateAccountRequestBodyDTO,
    AccountRequestParamDTO,
    LoginUserRequestBodyDTO,
    UpdateAccountRequestBodyDTO,
    VerifyTokenRequestParamDTO,
    ResetPasswordRequestBodyDTO,
    AccountResetPassRequestParamDTO,
    ConfirmResetPasswordRequestBodyDTO,
    AccountRequestQueryDTO,
} from './dto/account.request.dto';
import {
    AccountResponseBodyDTO,
    GetAccountListResponseBodyDTO,
    LoginUserResponseBodyDTO,
    UpdateAccountResponseBodyDTO,
} from './dto/account.response.dto';
import configService from 'src/config/config.service';
import { Response } from 'express';
import { RequestWithAccount } from 'src/utils/utils.interface';
import { verifyPermission } from 'src/utils/utils.function';
import { AuthGuard } from '@nestjs/passport';
import { MenuPermission } from 'src/model/group-menu/entities/group-menu.binding.entity';

@ApiTags('Account Management')
@Controller()
export class AccountApiController {
    constructor(private readonly accountManagerservice: AccountManagerService) {}

    @Post('/v1/account')
    @HttpCode(200)
    @ApiResponse({ type: AccountResponseBodyDTO })
    @ApiBearerAuth()
    public async createAccount(
        @Body() body: CreateAccountRequestBodyDTO,
        @Req() req: RequestWithAccount
    ): Promise<AccountResponseBodyDTO> {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'account', MenuPermission.CREATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.accountManagerservice.createNewAccount(body, req);
    }

    @Post('/v1/send-verifyemail/:uuid')
    @HttpCode(200)
    @ApiBearerAuth()
    public async sendVerifyEmail(
        @Param() param: AccountRequestParamDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'account', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.accountManagerservice.SendMailVerifyAccount(param);
    }

    @Get('/v1/account')
    @HttpCode(200)
    @ApiResponse({ type: GetAccountListResponseBodyDTO })
    @ApiBearerAuth()
    public async getAllAccount(
        @Query() query: AccountRequestQueryDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'account', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.accountManagerservice.getWithPagination(query);
    }

    @Get('/v1/account/:uuid')
    @HttpCode(200)
    @ApiResponse({ type: AccountResponseBodyDTO })
    @ApiBearerAuth()
    public async getAccount(
        @Param() param: AccountRequestParamDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'account', MenuPermission.READ)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.accountManagerservice.getAccount(param);
    }

    @Put('/v1/account/:uuid')
    @HttpCode(200)
    @ApiResponse({ type: UpdateAccountResponseBodyDTO })
    @ApiBearerAuth()
    public async updateAccount(
        @Param() param: AccountRequestParamDTO,
        @Body() body: UpdateAccountRequestBodyDTO,
        @Req() req: RequestWithAccount
    ): Promise<UpdateAccountResponseBodyDTO> {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'account', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.accountManagerservice.updateAccount(param, body, req);
    }

    @Delete('/v1/account/:uuid')
    @ApiBearerAuth()
    public async deleteAccount(
        @Param() param: AccountRequestParamDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'account', MenuPermission.DELETE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.accountManagerservice.deleteAccount(param, req);
    }

    @Get('/v1/verify-email/:verifyToken')
    @HttpCode(200)
    @ApiOkResponse()
    public async verifyToken(@Param() param: VerifyTokenRequestParamDTO) {
        // //console.log(param);
        return await this.accountManagerservice.verifyAccount(param.verifyToken);
    }

    @Post('/v1/login')
    @HttpCode(200)
    @ApiOkResponse({ type: LoginUserResponseBodyDTO })
    public async login(@Body() body: LoginUserRequestBodyDTO, @Res() res: Response): Promise<void> {
        const response = await this.accountManagerservice.loginAccount(body);

        // //console.log(response);
        const expires = new Date();
        expires.setMilliseconds(
            expires.getMilliseconds() + configService.getConfig().jwtExpiration
        );
        res.status(200)
            .cookie('access-token', response.accessToken, {
                secure: true,
                httpOnly: true,
                expires,
                sameSite: true,
            })
            .send(response);
        //console.log(res.getHeaders());
    }

    @Post('/v1/reset-password')
    @HttpCode(200)
    @ApiOkResponse()
    public async SendMailResetPassword(@Body() body: ResetPasswordRequestBodyDTO) {
        return await this.accountManagerservice.sendMailResetPassword(body);
    }

    @Get('/v1/reset-password/:token')
    @HttpCode(200)
    @ApiOkResponse()
    public async getResetPasswordTokenInformation(
        @Param() params: AccountResetPassRequestParamDTO
    ) {
        return await this.accountManagerservice.getResetPasswordTokenInformation(params.token);
    }

    @Put('/v1/reset-password/:token')
    @HttpCode(200)
    @ApiOkResponse()
    public async resetPassword(
        @Body() body: ConfirmResetPasswordRequestBodyDTO,
        @Param() param: AccountResetPassRequestParamDTO
    ) {
        return await this.accountManagerservice.resetPassword(param.token, body);
    }

    @Put('/v1/disableAndEnable-account/:uuid')
    @HttpCode(200)
    @ApiOkResponse()
    @ApiBearerAuth()
    public async disableEnableAccount(
        @Param() param: AccountRequestParamDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'account', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.accountManagerservice.disableAndEnableAccount(param, req);
    }

    @Put('/v1/recovery-account/:uuid')
    @HttpCode(200)
    @ApiOkResponse()
    @ApiBearerAuth()
    public async recoveryAccount(
        @Param() param: AccountRequestParamDTO,
        @Req() req: RequestWithAccount
    ) {
        if (!verifyPermission(req.reqAccount?.role?.groupMenu, 'account', MenuPermission.UPDATE)) {
            throw new ForbiddenException('Permission Denined');
        }
        return await this.accountManagerservice.recoveryAccount(param, req);
    }

    @Get('/v1/account-info')
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Returns account information from token' })
    getAccountFromToken(@Req() req: RequestWithAccount) {
        if (!req.reqAccount) {
            throw new UnauthorizedException('No account information found');
        }
        // return {
        //     firstName: req.reqAccount.firstName,
        //     lastName: req.reqAccount.lastName,
        //     role: req.reqAccount.role.roleName,
        //     // สามารถส่งข้อมูลอื่นๆ จาก account entity ได้ตามต้องการ
        // };
        return req.reqAccount.toResponse();
    }
}
