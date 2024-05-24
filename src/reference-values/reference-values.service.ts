import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReferenceValueDto } from './dto/create-reference-value.dto';
import { UpdateReferenceValueDto } from './dto/update-reference-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferenceValue } from './entities/reference-value.entity';
import { ReferenceBook } from '../reference-book/entities/reference-book.entity';

@Injectable()
export class ReferenceValuesService {
  constructor(
    @InjectRepository(ReferenceValue)
    private readonly refsValueRepository: Repository<ReferenceValue>,
    @InjectRepository(ReferenceBook)
    private readonly refsRepository: Repository<ReferenceBook>,
  ) {}
  async create(createReferenceValueDto: CreateReferenceValueDto) {
    const isExist = await this.refsValueRepository.findOne({
      where: { code_name: createReferenceValueDto.codeName },
    });

    if (isExist)
      throw new BadRequestException('Значение с таким кодом уже существует');

    const refBookExist = await this.refsRepository.findOne({
      where: { id: createReferenceValueDto.refId },
    });

    if (!refBookExist)
      throw new BadRequestException('Справочник с таким id не найден');

    const newRefValue = {
      code_name: createReferenceValueDto.codeName,
      value: createReferenceValueDto.value,
      ref_book: refBookExist,
    };

    return await this.refsValueRepository.save(newRefValue);
  }

  async findAllByRefCodeName(refCodeName: string) {
    const referenceBook = await this.refsRepository.findOne({
      where: { ref_code_name: refCodeName },
      relations: { ref_values: true },
    });
    return referenceBook.ref_values;
  }

  async findOne(id: number) {
    const refValue = await this.refsValueRepository.findOne({ where: { id } });

    if (!refValue)
      throw new BadRequestException('Справочное значение с таким id не найден');

    return refValue;
  }

  async update(id: number, updateReferenceValueDto: UpdateReferenceValueDto) {
    const refValue = await this.refsValueRepository.findOne({ where: { id } });

    if (!refValue)
      throw new BadRequestException('Справочное значение с таким id не найден');

    const isValueCodeNameExist = await this.refsValueRepository.findOne({
      where: { code_name: updateReferenceValueDto.codeName },
    });

    if (isValueCodeNameExist)
      throw new BadRequestException(
        'Справочное значение с таким codeName уже существует',
      );

    const updateRefValue = {
      ref_code_name: updateReferenceValueDto.codeName,
      value: updateReferenceValueDto.value,
    };

    return this.refsValueRepository.update(id, updateRefValue);
  }

  remove(id: number) {
    const refValue = this.refsValueRepository.findOne({ where: { id } });

    if (!refValue)
      throw new BadRequestException('Справочное значение с таким id не найден');

    return this.refsValueRepository.delete(id);
  }
}
