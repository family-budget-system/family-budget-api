import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from '../../category/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Icon } from '../../icon/entities/icon.entity';

@Injectable()
export class DefaultCategoriesLoader {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Icon)
    private readonly iconRepository: Repository<Icon>,
  ) {}

  async loadDefaultCategories() {
    for (const category of defaultConsumptionCategories) {
      const icon = await this.iconRepository.findOne({
        where: { name: category.iconName },
      });

      if (!icon) {
        throw new BadRequestException('Такая иконка не существует');
      }

      const existingCategories = await this.categoryRepository.find({
        where: { title: category.title },
      });

      const newCategory = {
        ...category,
        icon,
      };

      if (existingCategories.length === 0) {
        const categories = this.categoryRepository.create(newCategory);
        await this.categoryRepository.save(categories);
      }
    }
  }
}

export const defaultConsumptionCategories = [
  { title: 'Зарплата', isDefault: true, iconName: 'coin' },
  { title: 'Продукты', isDefault: true, iconName: 'food' },
  { title: 'Кафе и рестораны', isDefault: true, iconName: 'cafe' },
  { title: 'Отдых и развлечения', isDefault: true, iconName: 'relax' },
  { title: 'Дети', isDefault: true, iconName: 'children' },
  { title: 'Забота о себе', isDefault: true, iconName: 'self_care' },
  {
    title: 'Здоровье и фитнес',
    isDefault: true,
    iconName: 'health_and_fitness',
  },
  { title: 'Корректировка', isDefault: true, iconName: 'adjustment' },
  { title: 'Машина', isDefault: true, iconName: 'car' },
  { title: 'Образование', isDefault: true, iconName: 'education' },
  { title: 'Платежи, комиссии', isDefault: true, iconName: 'payments_and_tax' },
  { title: 'Подарки', isDefault: true, iconName: 'present' },
  { title: 'Покупки: одежда, техника', isDefault: true, iconName: 'purchases' },
  { title: 'Проезд', isDefault: true, iconName: 'travel' },
  { title: 'Без категории', isDefault: true, iconName: 'close' },
];
