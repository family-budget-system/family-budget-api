import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '../bill/entities/bill.entity';
import { Transaction } from './entities/transaction.entity';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Transaction, Category, User])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}