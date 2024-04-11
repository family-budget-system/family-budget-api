import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title,
    });

    if (isExist.length) {
      throw new BadRequestException('This category already exist!');
    }

    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id,
      },
      categories: [],
    };

    return this.categoryRepository.save(newCategory);
  }

  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: { user: { id } },
      relations: { transactions: true },
    });
  }

  async findOne(id: number) {
    if (!(await this.categoryIsExist(id)))
      throw new NotFoundException('Category not found');

    return await this.categoryRepository.findOne({
      where: { id },
      relations: { transactions: true, user: true },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryIsExist(id);
    if (!category) throw new NotFoundException('Category not found');

    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    if (!(await this.categoryIsExist(id)))
      throw new NotFoundException('Category not found');

    return await this.categoryRepository.delete(id);
  }

  async categoryIsExist(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }
}
