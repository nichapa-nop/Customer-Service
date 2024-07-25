import { ApiProperty } from '@nestjs/swagger';
import { CustomerResponse } from 'src/utils/utils.response.dto';

export class CustomerResponseBodyDTO {
    @ApiProperty()
    customerDetail: CustomerResponse;
}

export class GetCustomerListResponseBodyDTO {
    @ApiProperty({ type: CustomerResponse, isArray: true })
    customer: CustomerResponse[];
}
