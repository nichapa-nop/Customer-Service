import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DataStoreModule } from './store/store.module';
import configService from './config/config.service';
import { AuthenticationMiddleware } from './middleware/authentication/authentication.middleware';

process.env.CLIENT_ID = configService.getConfig().clientId;

@Module({
    imports: [ApiModule, DataStoreModule],
    providers: [
        {
            provide: 'CLIENT_ID',
            useValue: configService.getConfig().clientId,
        },
        {
            provide: 'CLIENT_SECRET',
            useValue: configService.getConfig().clientSecret,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .exclude(
                { path: '/v1/verify-email/:verifyToken', method: RequestMethod.GET },
                { path: '/v1/login', method: RequestMethod.POST },
                { path: '/v1/account', method: RequestMethod.POST },
                { path: '/v1/reset-password', method: RequestMethod.POST },
                { path: '/v1/reset-password/:token', method: RequestMethod.PUT }
            )
            .forRoutes('*');
    }
}
