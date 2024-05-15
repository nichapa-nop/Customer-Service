import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordEntity } from './entities/reset-pass.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResetPasswordService {
    constructor(
        @InjectRepository(ResetPasswordEntity)
        private readonly resetPasswordRepository: Repository<ResetPasswordEntity>
    ) {}

    public save(reset: ResetPasswordEntity) {
        return this.resetPasswordRepository.save(reset);
    }
}
