import { ForbiddenException, Injectable } from '@nestjs/common';
import {
    CustomerRequestBodyDTO,
    CustomerRequestParamDTO,
} from 'src/api/customer/dto/customer.request.dto';
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

    public async updateCustomer(body: CustomerRequestBodyDTO, param: CustomerRequestParamDTO) {
        let currentCustomer = await this.customerService.getById(param.id);
        if (!currentCustomer) {
            throw new ForbiddenException('ID was incorrect or it does not exist.');
        }
        currentCustomer.update({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNum: body.phoneNum,
            companyName: body.phoneNum,
            type: body.type,
        });
        // currentCustomer.updatedBy = req.reqAccount.uuid;
        await this.customerService.save(currentCustomer);
        return {
            updateAccountDetail: currentCustomer.toResponse(),
        };
    }

    public async deleteCustomer(param: CustomerRequestParamDTO) {
        let currentCustomer = await this.customerService.getById(param.id);
        if (!currentCustomer) {
            throw new ForbiddenException('ID was incorrect or it does not exist.');
        }
        return await this.customerService.delete(currentCustomer.id);
    }

    public async getAllCustomer() {
        let customers = await this.customerService.getAll();
        return {
            customerDetail: customers.map((customer) => customer.toResponse()),
        };
    }
}
