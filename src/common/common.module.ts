import { Injectable, Module, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";
import { DefaultCategoriesLoader } from './loaders/default-categories.loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { InitialRefsLoader } from './loaders/initial-refs.loader';
import { ReferenceBookService } from '../reference-book/reference-book.service';
import { ReferenceValuesService } from '../reference-values/reference-values.service';
import { ReferenceBook } from '../reference-book/entities/reference-book.entity';
import { ReferenceValue } from '../reference-values/entities/reference-value.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, ReferenceBook, ReferenceValue]),
  ],
  providers: [
    DefaultCategoriesLoader,
    InitialRefsLoader,
    ReferenceBookService,
    ReferenceValuesService,
  ],
})
export class CommonModule implements OnApplicationBootstrap {
  constructor(
    private readonly defaultCategoriesLoader: DefaultCategoriesLoader,
    private readonly initialRefsLoader: InitialRefsLoader,
  ) {}

  async onApplicationBootstrap() {
    await this.defaultCategoriesLoader.loadDefaultCategories();
    await this.initialRefsLoader.init();
  }
}
