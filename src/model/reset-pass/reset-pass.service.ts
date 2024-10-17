import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPasswordEntity, ResetPasswordStatus } from './entities/reset-pass.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ResetPasswordService {
    constructor(
        @InjectRepository(ResetPasswordEntity)
        private readonly resetPasswordRepository: Repository<ResetPasswordEntity>
    ) {}

    public save(reset: ResetPasswordEntity) {
        return this.resetPasswordRepository.save(reset);
    }

    public getByToken(resetPassToken: string, status?: ResetPasswordStatus) {
        let where: FindOptionsWhere<ResetPasswordEntity> = { resetPassToken };
        if (status) {
            where.status = status;
        }
        return this.resetPasswordRepository.findOne({ where, relations: { account: true } });
    }
}
