import { Module, OnModuleInit } from '@nestjs/common';
import { DefaultCategoriesLoader } from './loaders/default-categories.loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [DefaultCategoriesLoader],
})
export class CommonModule implements OnModuleInit {
  constructor(
    private readonly defaultCategoriesLoader: DefaultCategoriesLoader,
  ) {}

  async onModuleInit() {
    await this.defaultCategoriesLoader.loadDefaultCategories();
  }
}
