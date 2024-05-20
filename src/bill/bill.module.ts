import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { ReferenceValue } from '../reference-values/entities/reference-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, ReferenceValue])],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
