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
import { User } from '../user/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: { id },
      title: createCategoryDto.title,
    });

    if (isExist.length) {
      throw new BadRequestException('Данная категория уже существует');
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

  async createDefaultCategory(createCategoryDto: CreateCategoryDto) {
    const newCategory = {
      title: createCategoryDto.title,
    };

    return this.categoryRepository.save(newCategory);
  }

  async findAllDefault() {
    return this.categoryRepository.find({ where: { isDefault: true } });
  }

  async findAllByUser(userId: number) {
    const user = await this.userIsExist(userId);
    if (!user) throw new NotFoundException('Пользователь не найден');

    const defaultCategories = await this.findAllDefault();

    return [...defaultCategories, ...user.categories];
  }

  async findOne(id: number) {
    if (!(await this.categoryIsExist(id)))
      throw new NotFoundException('Category not found');

    return await this.categoryRepository.findOne({
      where: { id },
      relations: { user: true },
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

  async userIsExist(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: { categories: true },
    });
  }

  async categoryIsExist(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }
}
