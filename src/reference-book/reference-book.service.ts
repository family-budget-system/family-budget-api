import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReferenceBookDto } from './dto/create-reference-book.dto';
import { UpdateReferenceBookDto } from './dto/update-reference-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferenceBook } from './entities/reference-book.entity';
import { Repository } from 'typeorm';
import { ReferenceBookResponseDto } from './dto/reference-book-response.dto';

@Injectable()
export class ReferenceBookService {
  constructor(
    @InjectRepository(ReferenceBook)
    private readonly refsRepository: Repository<ReferenceBook>,
  ) {}
  async create(createReferenceBookDto: CreateReferenceBookDto) {
    const isExist = await this.refsRepository.findOne({
      where: { ref_code_name: createReferenceBookDto.refCodeName },
    });

    if (isExist)
      throw new BadRequestException('Справочник с таким кодом уже существует');

    const newRefBook = {
      ref_code_name: createReferenceBookDto.refCodeName,
      ref_name: createReferenceBookDto.refName,
    };
    return await this.refsRepository.save(newRefBook);
  }

  async findAll() {
    const references = await this.refsRepository.find();
    return references.map((item) => {
      return {
        id: item.id,
        refCodeName: item.ref_code_name,
      } as ReferenceBookResponseDto;
    });
  }

  async findOne(refCodeName: string) {
    return await this.refsRepository.findOne({
      where: { ref_code_name: refCodeName },
    });
  }

  async update(id: number, updateReferenceBookDto: UpdateReferenceBookDto) {
    if (!(await this.refsRepository.findOne({ where: { id } })))
      throw new BadRequestException('Справочник с таким id не найден');

    const isCodeNameExist = await this.refsRepository.findOne({
      where: { ref_code_name: updateReferenceBookDto.refCodeName },
    });

    if (isCodeNameExist)
      throw new BadRequestException(`Справочник с таким кодом уже существует`);

    const updateRefBook = {
      ref_code_name: updateReferenceBookDto.refCodeName,
    };

    return this.refsRepository.update(id, updateRefBook);
  }

  async remove(id: number) {
    const isRefExist = await this.refsRepository.findOne({ where: { id } });

    if (!isRefExist)
      throw new BadRequestException('Справочник с таким id не найден');

    return this.refsRepository.delete(id);
  }
}
