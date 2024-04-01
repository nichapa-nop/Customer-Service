import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DataStoreModule } from './store/store.module';
import configService from './config/config.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
        }
    ],
})
export class AppModule {
}
