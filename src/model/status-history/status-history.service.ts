import { Injectable } from '@nestjs/common';
import { StatusHistoryEntity } from './entity/status-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusHistoryService {
    constructor(
        @InjectRepository(StatusHistoryEntity)
        private readonly statusHistoryRepository: Repository<StatusHistoryEntity>
    ) {}

    public save(history: StatusHistoryEntity) {
        return this.statusHistoryRepository.save(history);
    }
}
