import {
    ForbiddenException,
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { AccountService } from 'src/model/account/account.service';
import { RequestWithAccount } from 'src/utils/utils.interface';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly accountService: AccountService
    ) {}
    public async use(req: RequestWithAccount, res: Response, next: NextFunction) {
        // console.log(req.headers.authorization);
        if (!req.headers.authorization) {
            throw new UnauthorizedException('Missing Authorization token.');
        }
        try {
            let payload = await this.jwtService.verifyAsync(
                req.headers.authorization.replace('Bearer ', '')
            );
            if (!payload?.uuid) {
                throw 'Permission denined';
            }
            let account = await this.accountService.getByUuid(payload.uuid);
            if (!account) {
                throw 'Account not found';
            }
            req.reqAccount = account;
            return next();
        } catch (e) {
            console.log(req.headers.authorization);
            console.log(e);
            throw new ForbiddenException('Token is in valid.');
        }
    }
}
