import { Injectable } from '@nestjs/common';
import { CustomerRequestBodyDTO } from 'src/api/customer/dto/customer.request.dto';
import { CustomerResponseBodyDTO } from 'src/api/customer/dto/customer.response.dto';
import { CustomerService } from 'src/model/customer/customer.service';
import { CustomerEntity } from 'src/model/customer/entities/customer.entity';
import { CustomerResponse } from 'src/utils/utils.response.dto';

@Injectable()
export class CustomerManagerService {
    constructor(private readonly customerService: CustomerService) {}

    public async createNewCustomer(body: CustomerRequestBodyDTO): Promise<CustomerResponseBodyDTO> {
        let newCustomer = new CustomerEntity();
        newCustomer.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNum: body.phoneNum,
            companyName: body.phoneNum,
            type: body.type,
        });
        // newCustomer.createdBy = req.
        await this.customerService.save(newCustomer);
        return { customerDetail: newCustomer.toResponse() };
    }
}
