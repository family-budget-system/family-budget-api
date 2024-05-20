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
import { ReferenceValue } from '../reference-values/entities/reference-value.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    @InjectRepository(ReferenceValue)
    private readonly refValuesRepository: Repository<ReferenceValue>,
  ) {}

  async create(createBillDto: CreateBillDto, userId: number) {
    const isExist = await this.billRepository.findBy({
      user: { id: userId },
      title: createBillDto.title,
    });

    if (isExist.length) {
      throw new BadRequestException('Счёт с таким именем уже существует');
    }

    const currency = await this.refValuesRepository.findOne({
      where: { id: createBillDto.currencyId },
    });
    if (!currency) {
      throw new BadRequestException('currencyId не найден в справочнике');
    }

    const newBill = {
      title: createBillDto.title,
      billType: createBillDto.billType,
      currency: currency,
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
      relations: { transactions: true, currency: true },
    });
  }

  async findOne(id: number) {
    if (!(await this.billIsExist(id)))
      throw new NotFoundException('Счёт не найден');

    return await this.billRepository.findOne({
      where: { id },
      relations: { transactions: true, user: true, currency: true },
    });
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const bill = await this.billIsExist(id);
    if (!bill) throw new NotFoundException('Счёт не найден');

    const currency = await this.refValuesRepository.findOne({
      where: { id: updateBillDto.currencyId },
    });
    if (!currency) {
      throw new BadRequestException('currencyId не найден в справочнике');
    }

    const updateBill: Partial<Bill> = {};

    if (updateBillDto.title !== undefined) {
      updateBill.title = updateBillDto.title;
    }

    if (updateBillDto.billType !== undefined) {
      updateBill.billType = updateBillDto.billType;
    }

    if (updateBillDto.currencyId !== undefined) {
      const currency = await this.refValuesRepository.findOne({
        where: { id: updateBillDto.currencyId },
      });
      if (currency) {
        updateBill.currency = currency;
      }
    }

    if (updateBillDto.balance !== undefined) {
      updateBill.balance = updateBillDto.balance;
    }

    return await this.billRepository.update(id, updateBill);
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
