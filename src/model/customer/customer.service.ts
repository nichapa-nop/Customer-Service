import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>
    ) {}

    public save(customer: CustomerEntity) {
        return this.customerRepository.save(customer);
    }

    public getAll(): Promise<CustomerEntity[]> {
        return this.customerRepository.find();
    }

    public getById(id: number) {
        return this.customerRepository.findOneBy({ id });
    }

    public delete(id: number) {
        return this.customerRepository.delete({ id });
    }
}
