import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    ServiceUnavailableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import {
    CreateAccountRequestBodyDTO,
    AccountRequestParamDTO,
    LoginUserRequestBodyDTO,
    UpdateAccountRequestBodyDTO,
    ConfirmResetPasswordRequestBodyDTO,
    ResetPasswordRequestBodyDTO,
    AccountRequestQueryDTO,
} from 'src/api/account/dto/account.request.dto';
import {
    AccountResponseBodyDTO,
    UpdateAccountResponseBodyDTO,
} from 'src/api/account/dto/account.response.dto';
import configService from 'src/config/config.service';
import { AccountService } from 'src/model/account/account.service';
import { AccountEntity, AccountStatus } from 'src/model/account/entities/account.entity';
import {
    ResetPasswordEntity,
    ResetPasswordStatus,
} from 'src/model/reset-pass/entities/reset-pass.entity';
import { ResetPasswordService } from 'src/model/reset-pass/reset-pass.service';
import { SendMailService } from 'src/service/mailer/mailer.service';
import { generateRandomString } from 'src/utils/utils.function';
import { v4 as uuidV4 } from 'uuid';
import { RoleService } from 'src/model/role/role.service';
import { RequestWithAccount } from 'src/utils/utils.interface';

@Injectable()
export class AccountManagerService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
        private readonly emailService: SendMailService,
        private readonly resetPasswordService: ResetPasswordService,
        private readonly roleService: RoleService
    ) {}

    public async createNewAccount(
        body: CreateAccountRequestBodyDTO,
        req: RequestWithAccount
    ): Promise<AccountResponseBodyDTO> {
        console.log('Received reqAccount:', req.reqAccount);
        let newAccount = new AccountEntity();
        let email = await this.accountService.getByEmail(body.email);
        if (!email) {
            newAccount.create({
                firstName: body.firstName,
                lastName: body.lastName,
                firstNameTh: body.firstNameTh,
                lastNameTh: body.lastNameTh,
                email: body.email,
                phoneNum: body.phoneNum,
                createdBy: req.reqAccount.uuid,
                // createdBy: 'root account',
                verifyToken: uuidV4(),
            });
            let role = await this.roleService.getByName('user'); // Adjust the role name as needed
            newAccount.role = role; // Assign the role to the account
            // newAccount.role = [];
            let createAccount = await this.accountService.save(newAccount);

            return { accountDetail: createAccount.toResponse() };
        } else {
            throw new ForbiddenException('Email is already exist.');
        }
    }

    public async SendMailVerifyAccount(param: AccountRequestParamDTO) {
        let currentAccount = await this.accountService.getByUuid(param.uuid);
        if (!currentAccount) {
            throw new BadRequestException('UUID was incorrect or it does not exist.');
        }
        this.emailService.postMail({
            to: currentAccount.email,
            from: 'no-reply <noreply.testnoreply@gmail.com>',
            subject: 'Please Verify Your Email',
            text: `To verify your email please follow the url\n 
                ${configService.getConfig().serverEndpoint}/v1/verify-email/${
                currentAccount.verifyToken
            }`,
        });
        return { accountDetail: currentAccount.toResponse() };
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

    public async getWithPagination(query: AccountRequestQueryDTO) {
        let [accounts, count] = await this.accountService.getWithPagination(query);
        return {
            accounts: accounts.map((account) => account.toResponse()),
            pagination: { page: query.page, itemsPerPage: query.itemsPerPage, itemsCount: count },
        };
    }

    public async updateAccount(
        param: AccountRequestParamDTO,
        body: UpdateAccountRequestBodyDTO,
        req: RequestWithAccount
    ): Promise<UpdateAccountResponseBodyDTO> {
        let currentAccount = await this.accountService.getByUuid(param.uuid);
        if (!currentAccount) {
            throw new BadRequestException('UUID was incorrect or it does not exist.');
        } else {
            currentAccount.update({
                firstName: body.firstName,
                lastName: body.lastName,
                firstNameTh: body.firstNameTh,
                lastNameTh: body.lastNameTh,
                email: body.email,
                phoneNum: body.phoneNum,
                status: body.status,
                // type: body.type,
                // updatedBy: req.reqAccount.uuid,
            });
            currentAccount.updatedBy = req.reqAccount.uuid;
            await this.accountService.save(currentAccount);
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
            currentAccount.status = AccountStatus.DELETED;
            return await this.accountService.save(currentAccount);
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
        if (currentAccount.status !== AccountStatus.VERIFIED) {
            throw new ForbiddenException('Permission Denied.');
        }
        const payload = { uuid: currentAccount.uuid, email: currentAccount.email };
        let accessToken = await this.jwtService.signAsync(payload);
        console.log(accessToken);
        return { accessToken };
    }

    public async verifyAccount(token: string) {
        // let currentToken = await this.accountService.getByUuid(verifyToken);
        let currentToken = await this.accountService.getByToken(token);
        if (!currentToken) {
            throw new BadRequestException('Token was incorrect.');
        }
        if (currentToken.status === AccountStatus.VERIFIED) {
            throw new BadRequestException('Account is already active.');
        } else {
            currentToken.status = AccountStatus.VERIFIED;
            // password: await hash(body.password, 10),
            let generatedPassword = generateRandomString(10);
            console.log(generatedPassword);
            currentToken.password = await hash(generatedPassword, 10);
            this.emailService.postMail({
                to: currentToken.email,
                from: 'no-reply <noreply.testnoreply@gmail.com>',
                subject: 'Temporary Password',
                text: `Your Account is Activate!\nYour temporary password: ${generatedPassword}`,
            });

            return await this.accountService.save(currentToken);
        }
    }

    public async sendMailResetPassword(body: ResetPasswordRequestBodyDTO) {
        let currentEmail = await this.accountService.getByEmail(body.email);
        if (!currentEmail) {
            throw new ForbiddenException('Email was incorrect or it does not exist.');
        }

        if (currentEmail.status !== AccountStatus.VERIFIED) {
            throw new ForbiddenException('Permission Denied.');
        }
        let generatedToken = uuidV4();
        // currentEmail.verifyToken =
        let newResetPassword = new ResetPasswordEntity();
        newResetPassword.resetPassToken = generatedToken;
        newResetPassword.expiredAt = new Date(Date.now() + 60 * 60 * 1000);
        newResetPassword.account = currentEmail;
        await this.resetPasswordService.save(newResetPassword);
        this.emailService.postMail({
            to: currentEmail.email,
            from: 'no-reply <noreply.testnoreply@gmail.com>',
            subject: 'Reset Password Link',
            text: `To verify your email please follow the url\n${
                configService.getConfig().serverEndpoint
            }/v1/reset-password/${generatedToken} `,
        });
        const payload = { uuid: currentEmail.uuid, email: currentEmail.email };
        return { payload };
    }

    public async resetPassword(token: string, body: ConfirmResetPasswordRequestBodyDTO) {
        let currentToken = await this.resetPasswordService.getByToken(token);
        if (!currentToken) {
            throw new BadRequestException('Token was incorrect.');
        }
        let now = new Date(Date.now());
        if (now >= currentToken.expiredAt) {
            currentToken.status = ResetPasswordStatus.EXPIRED;
            await this.resetPasswordService.save(currentToken);
            throw new BadRequestException('Token is not exist.');
        }
        if (currentToken.status === ResetPasswordStatus.COMPLETED) {
            throw new BadRequestException('Token is already used.');
        }
        currentToken.status = ResetPasswordStatus.COMPLETED;
        let currentAccount = currentToken.account;
        currentAccount.password = await hash(body.password, 10);
        await this.resetPasswordService.save(currentToken);
        return await this.accountService.save(currentAccount);
    }

    public async disableAndEnableAccount(param: AccountRequestParamDTO, req: RequestWithAccount) {
        let currentAccount = await this.accountService.getByUuid(param.uuid);
        if (!currentAccount) {
            throw new BadRequestException('Account was incorrect or it does not exist.');
        }
        if (currentAccount.status === AccountStatus.VERIFIED) {
            currentAccount.status = AccountStatus.DISABLED;
            console.log(currentAccount.status);

            // await this.accountService.save(currentAccount);
        } else if (currentAccount.status === AccountStatus.DISABLED) {
            currentAccount.status = AccountStatus.VERIFIED;
        }
        console.log(currentAccount.status);
        currentAccount.updatedBy = req.reqAccount.uuid;

        return await this.accountService.save(currentAccount);
    }

    public async recoveryAccount(param: AccountRequestParamDTO, req: RequestWithAccount) {
        let currentAccount = await this.accountService.getByUuid(param.uuid);
        if (!currentAccount) {
            throw new BadRequestException('Account was incorrect or it does not exist.');
        }
        if (currentAccount.status !== AccountStatus.DELETED) {
            throw new BadRequestException('Account cannot recovery.');
        }
        currentAccount.status = AccountStatus.NOT_VERIFY;
        currentAccount.verifyToken = uuidV4();
        currentAccount.updatedBy = req.reqAccount.uuid;
        // this.emailService.postMail({
        //     to: currentAccount.email,
        //     from: 'no-reply <noreply.testnoreply@gmail.com>',
        //     subject: 'Please Verify Your Email',
        //     text: `To verify your email please follow the url\n
        //         ${configService.getConfig().serverEndpoint}/v1/verify-email/${
        //         currentAccount.verifyToken
        //     }`,
        // });
        let updatedAccount = await this.accountService.save(currentAccount);
        console.log(updatedAccount);
        return { account: updatedAccount.toResponse() };
    }
}
