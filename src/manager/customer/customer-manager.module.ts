import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/model/customer/customer.module';
import { CustomerManagerService } from './customer-manager.service';

@Module({
    imports: [CustomerModule],
    providers: [CustomerManagerService],
    exports: [CustomerManagerService],
})
export class CustomerManagerModule {}
