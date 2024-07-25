import { Module } from '@nestjs/common';
import { CustomerManagerModule } from 'src/manager/customer/customer-manager.module';
import { CustomerApiController } from './customer.controller';

@Module({
    imports: [CustomerManagerModule],
    controllers: [CustomerApiController],
})
export class CustomerApiModule {}
