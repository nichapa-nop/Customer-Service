import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordEntity } from './entities/reset-pass.entity';
import { ResetPasswordService } from './reset-pass.service';

@Module({
    imports: [TypeOrmModule.forFeature([ResetPasswordEntity])],
    providers: [ResetPasswordService],
    exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
