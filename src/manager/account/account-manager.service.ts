import { BadRequestException, ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import {
    CreateAccountRequestBodyDTO,
    AccountRequestParamDTO,
    LoginUserRequestBodyDTO,
    UpdateAccountRequestBodyDTO,
    VerifyTokenRequestParamDTO,
} from 'src/api/account/dto/account.request.dto';
import { AccountResponseBodyDTO, UpdateAccountResponseBodyDTO } from 'src/api/account/dto/account.response.dto';
import configService from 'src/config/config.service';
import { AccountService } from 'src/model/account/account.service';
import { AccountEntity, AccountStatus } from 'src/model/account/entities/account.entity';
import { SendMailService } from 'src/service/mailer/mailer.service';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class AccountManagerService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
        private readonly emailService: SendMailService
    ) {}

    public async createNewAccount(body: CreateAccountRequestBodyDTO): Promise<AccountResponseBodyDTO> {
        let newAccount = new AccountEntity();
        let email = await this.accountService.getByEmail(body.email);
        if (!email) {
            newAccount.create({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: await hash(body.password, 10),
                createdBy: body.createdBy,
                verifyToken: uuidV4(),
            });
            let createAccount = await this.accountService.save(newAccount);
            this.emailService.postMail({
                to: createAccount.email,
                from: 'no-reply <noreply.testnoreply@gmail.com>',
                subject: 'Please Verify Your Email',
                text: `To verify your email please follow the url ${
                    configService.getConfig().serverEndpoint
                }/v1/verify-email/${newAccount.verifyToken}`,
            });

            return { accountDetail: createAccount.toResponse() };
        } else {
            throw new ForbiddenException('Email is already exist.');
        }
    }

    public async getAllAccount() {
        let accounts = await this.accountService.getAll();
        return {
            accountDetail: accounts.map((account) => account.toResponse()),
        };
    }

    public async getAccount(param: AccountRequestParamDTO) {
        let account = await this.accountService.getByUuid(param.uuid);
        if (!account) {
            throw new BadRequestException('UUID was incorrect or it does not exist.');
        }
        return { accountDetail: account.toResponse() };
    }

    public async updateAccount(
        param: AccountRequestParamDTO,
        body: UpdateAccountRequestBodyDTO
    ): Promise<UpdateAccountResponseBodyDTO> {
        let currentAccount = await this.accountService.getByUuid(param.uuid);
        if (!currentAccount) {
            throw new BadRequestException('UUID was incorrect or it does not exist.');
        } else {
            currentAccount.update({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                updatedBy: body.updatedBy,
            });
            return {
                updateAccountDetail: currentAccount.toResponse(),
            };
        }
    }

    public async deleteAccount(param: AccountRequestParamDTO) {
        let currentAccount = await this.accountService.getByUuid(param.uuid);
        if (!currentAccount) {
            throw new BadRequestException('Account was incorrect or it does not exist.');
        } else {
            return await this.accountService.delete(param.uuid);
        }
    }

    public async loginAccount(body: LoginUserRequestBodyDTO) {
        let currentAccount = await this.accountService.getByEmail(body.email);
        if (!currentAccount) {
            throw new ForbiddenException('Email was incorrect or it does not exist.');
        }
        let comparePass = await compare(body.password, currentAccount.password);
        if (!comparePass) {
            throw new ForbiddenException('Password was incorrector it does not exist.');
        }
        const payload = { uuid: currentAccount.uuid, email: currentAccount.email };
        let accessToken = await this.jwtService.signAsync(payload);
        return { accessToken };
    }

    public async verifyToken(token: string) {
        // let currentToken = await this.accountService.getByUuid(verifyToken);
        let currentToken = await this.accountService.getByToken(token);
        if (!currentToken) {
            throw new BadRequestException('Token was incorrect.');
        }
        if (currentToken.status == AccountStatus.ACTIVE) {
            throw new BadRequestException('Account is already active.');
        } else {
            currentToken.status = AccountStatus.ACTIVE;
            currentToken.verifyToken = null;
            return await this.accountService.save(currentToken);
        }
    }
}
