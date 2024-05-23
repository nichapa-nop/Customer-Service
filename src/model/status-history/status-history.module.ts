import { Module } from "@nestjs/common";
import { StatusHistoryService } from "./status-history.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatusHistoryEntity } from "./entity/status-history.entity";

@Module({
    imports: [TypeOrmModule.forFeature([StatusHistoryEntity])],
    providers: [StatusHistoryService],
    exports: [StatusHistoryService]

})
export class StatusHistoryModule {}