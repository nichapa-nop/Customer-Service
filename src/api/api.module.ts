import { Module } from '@nestjs/common';
import { AccountApiModule } from './account/account.module';

@Module({
    imports: [AccountApiModule],
})
export class ApiModule {}
