import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIconDto } from './dto/create-icon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Icon } from './entities/icon.entity';
import { Repository } from 'typeorm';
import { UpdateIconDto } from './dto/update-icon.dto';

@Injectable()
export class IconService {
  constructor(
    @InjectRepository(Icon)
    private readonly iconRepository: Repository<Icon>,
  ) {}

  async create(createIconDto: CreateIconDto): Promise<Icon> {
    const iconExist = await this.iconRepository.find({
      where: { name: createIconDto.name },
    });
    if (iconExist.length) {
      throw new BadRequestException('Иконка с таким именем уже существует');
    }
    const icon = this.iconRepository.create(createIconDto);
    return this.iconRepository.save(icon);
  }

  async findAll(): Promise<Icon[]> {
    return this.iconRepository.find();
  }

  async findOne(id: number): Promise<Icon> {
    return this.iconRepository.findOne({ where: { id } });
  }

  async update(id, updateIconDto: UpdateIconDto) {
    const iconExist = await this.iconRepository.find({
      where: { name: updateIconDto.name },
    });
    if (iconExist.length) {
      throw new BadRequestException('Иконка с таким именем уже существует');
    }

    return await this.iconRepository.update(id, updateIconDto);
  }

  async remove(id: number): Promise<void> {
    await this.iconRepository.delete(id);
  }
}
