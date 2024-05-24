import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Bill } from '../bill/entities/bill.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: createTransactionDto.categoryId },
    });
    if (!category) {
      throw new BadRequestException('Категория не найдена');
    }

    const bill = await this.billRepository.findOne({
      where: { id: createTransactionDto.billId },
    });
    if (!bill) {
      throw new BadRequestException('Счет не найден');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    const newTransaction: Partial<Transaction> = {
      amount: createTransactionDto.amount,
      transaction_type: createTransactionDto.transactionType,
      payment_date: new Date(createTransactionDto.paymentDate),
      payer: createTransactionDto.payer,
      comment: createTransactionDto.comment,
      user,
      bill,
      category,
    };

    return this.transactionRepository.save(newTransaction);
  }

  async findAllByUser(userId: number) {
    return await this.transactionRepository.find({
      where: { user: { id: userId } },
      relations: {
        bill: true,
        category: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
