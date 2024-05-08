import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    public async use(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            throw new UnauthorizedException('Missing Authorization token.');
        }
        try {
            await this.jwtService.verifyAsync(req.headers.authorization.replace('Bearer ', ''));
            return next();
        } catch {
            throw new ForbiddenException('Token is in valid.');
        }
    }
}
