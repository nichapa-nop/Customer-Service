import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform, TicketEntity } from './entities/ticket.entity';
import { FindOptionsWhere, ILike, Or, Raw, Repository } from 'typeorm';
import { TicketRequestQueryDTO } from 'src/api/ticket/dto/ticket.request.dto';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TicketEntity)
        private readonly ticketRepository: Repository<TicketEntity>
    ) {}

    public save(ticket: TicketEntity) {
        return this.ticketRepository.save(ticket);
    }

    public getAll(): Promise<TicketEntity[]> {
        return this.ticketRepository.find({
            relations: { ticketComments: true },
            order: { id: 'DESC' },
        });
    }

    public getWithPagination(query: TicketRequestQueryDTO) {
        let where: FindOptionsWhere<TicketEntity>[] = [];
        //console.log(query);
        if (query.keyword) {
            where.push({
                ticketId: ILike(`%${query.keyword}%`),
            });
            where.push({
                topic: ILike(`%${query.keyword}%`),
            });
            where.push({
                assignAccount: [
                    {
                        firstName: ILike(`%${query.keyword}%`),
                    },
                    {
                        lastName: ILike(`%${query.keyword}%`),
                    },
                ],
            });
        }
        if (query.incidentType) {
            if (where.length) {
                where.forEach((condition) => {
                    condition.incidentType = query.incidentType;
                });
            } else {
                where.push({
                    incidentType: query.incidentType,
                });
            }
        }
        if (query.platform) {
            if (where.length) {
                where.forEach((condition) => {
                    condition.platform = query.platform;
                });
            } else {
                where.push({
                    platform: query.platform,
                });
            }
        }
        if (query.businessImpact) {
            if (where.length) {
                where.forEach((condition) => {
                    condition.businessImpact = query.businessImpact;
                });
            } else {
                where.push({
                    businessImpact: query.businessImpact,
                });
            }
        }
        if (query.status) {
            if (where.length) {
                where.forEach((condition) => {
                    condition.status = query.status;
                });
            } else {
                where.push({
                    status: query.status,
                });
            }
        }
        //console.log(where);
        return this.ticketRepository.findAndCount({
            take: query.itemsPerPage,
            skip: query.itemsPerPage * (query.page - 1),
            relations: { assignAccount: true },
            order: { id: 'DESC' },
            where,
        });
    }

    public delete(ticketId: string) {
        return this.ticketRepository.delete({ ticketId });
    }

    public getById(id: number) {
        return this.ticketRepository.findOneBy({ id });
    }

    public getByTicketId(ticketId: string) {
        return this.ticketRepository.findOne({
            where: { ticketId },
            relations: { assignAccount: true, ticketComments: true },
        });
    }

    public generateTicketId(count: number) {
        let prefix = 'INC';
        let numberPart = String(count).padStart(5, '0');
        let genTicketId = `${prefix}${numberPart}`;
        return genTicketId;
    }
}
