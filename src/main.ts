import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configService from './config/config.service';
import { ValidationPipe } from '@nestjs/common';

const serverPort = +process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const apiDocs = new DocumentBuilder()
        .setTitle('Customer Service') // Change This
        .setDescription('  ') // Change This
        .addServer(configService.getConfig().serverEndpoint)
        .addBearerAuth({
            description: `Please enter the authentication token`,
            name: 'Authorization',
            bearerFormat: 'Bearer',
            scheme: 'Bearer',
            type: 'http',
            in: 'Header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, apiDocs);
    SwaggerModule.setup('docs', app, document);
    await app.listen(serverPort);
}

bootstrap();
