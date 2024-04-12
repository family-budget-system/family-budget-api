import { Injectable } from '@nestjs/common';
import { Category } from '../../category/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DefaultCategoriesLoader {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async loadDefaultCategories() {
    for (const category of defaultConsumptionCategories) {
      const existingCategories = await this.categoryRepository.find({
        where: { title: category.title },
      });

      if (existingCategories.length === 0) {
        const categories = this.categoryRepository.create(category);
        await this.categoryRepository.save(categories);
      }
    }
  }
}

export const defaultConsumptionCategories = [
  { title: 'Продукты', isDefault: true },
  { title: 'Кафе и рестораны', isDefault: true },
  { title: 'Отдых и развлечения', isDefault: true },
  { title: 'Дети', isDefault: true },
  { title: 'Забота о себе', isDefault: true },
  { title: 'Здоровье и фитнес', isDefault: true },
  { title: 'Корректировка', isDefault: true },
  { title: 'Машина', isDefault: true },
  { title: 'Образование', isDefault: true },
  { title: 'Платежи, комиссии', isDefault: true },
  { title: 'Подарки', isDefault: true },
  { title: 'Покупки: одежда, техника', isDefault: true },
  { title: 'Проезд', isDefault: true },
];
