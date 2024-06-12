// import {
//     ForbiddenException,
//     Injectable,
//     NestMiddleware,
//     UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { NextFunction, Request, Response } from 'express';
// import { AccountManagerService } from 'src/manager/account/account-manager.service';

// @Injectable()
// export class RoleBasedAuthenticationMiddleware implements NestMiddleware {
//     constructor(
//         private readonly accountManagerService: AccountManagerService,
//         private readonly jwtService: JwtService
//     ) {}
//     public async use(req: Request, res: Response, next: NextFunction) {
//         if (!req.headers.authorization) {
//             throw new UnauthorizedException('Missing Authorization Token.');
//         }
//         const token = req.headers.authorization.replace('Bearer ', '');
//         const requiredRole = 'admin';

//         try {
//             // const decoderToken = await this.accountManagerService.
//             // req.account = decodedToken;
//             return next();
//         } catch {
//             throw new ForbiddenException('Token is in valid.');
//         }
//     }
// }
