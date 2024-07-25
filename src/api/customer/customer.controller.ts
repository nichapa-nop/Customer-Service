import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerManagerService } from 'src/manager/customer/customer-manager.service';
import { CustomerResponseBodyDTO } from './dto/customer.response.dto';
import { CustomerRequestBodyDTO } from './dto/customer.request.dto';

@ApiTags('Customer Management')
@Controller()
@ApiBearerAuth()
export class CustomerApiController {
    constructor(private readonly customerManagerService: CustomerManagerService) {}

    @Post('/v1/customer')
    @HttpCode(200)
    @ApiResponse({ type: CustomerResponseBodyDTO })
    public async createCustomer(
        @Body() body: CustomerRequestBodyDTO
    ): Promise<CustomerResponseBodyDTO> {
        return await this.customerManagerService.createNewCustomer(body);
    }

    @Get('/v1/customer')
    @HttpCode(200)
    public async getAllCustomer() {
        return await this.getAllCustomer();
    }
}
