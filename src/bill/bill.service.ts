import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  async create(createBillDto: CreateBillDto, userId: number) {
    const isExist = await this.billRepository.findBy({
      user: { id: userId },
      title: createBillDto.title,
    });

    if (isExist.length) {
      throw new BadRequestException('Счёт с таким именем уже существует');
    }

    const newBill = {
      title: createBillDto.title,
      billType: createBillDto.billType,
      currency: createBillDto.currency,
      balance: createBillDto.balance ?? 0,
      user: {
        id: userId,
      },
    };

    return this.billRepository.save(newBill);
  }

  async findAll(userId: number) {
    return await this.billRepository.find({
      where: { user: { id: userId } },
      relations: { transactions: true },
    });
  }

  async findOne(id: number) {
    if (!(await this.billIsExist(id)))
      throw new NotFoundException('Счёт не найден');

    return await this.billRepository.findOne({
      where: { id },
      relations: { transactions: true, user: true },
    });
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const bill = await this.billIsExist(id);
    if (!bill) throw new NotFoundException('Счёт не найден');

    return await this.billRepository.update(id, updateBillDto);
  }

  async remove(id: number) {
    if (!(await this.billIsExist(id)))
      throw new NotFoundException('Счёт не найден');

    return await this.billRepository.delete(id);
  }

  async billIsExist(id: number) {
    return await this.billRepository.findOne({ where: { id } });
  }
}
