import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { DefaultCategoriesLoader } from './loaders/default-categories.loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { InitialRefsLoader } from './loaders/initial-refs.loader';
import { ReferenceBookService } from '../reference-book/reference-book.service';
import { ReferenceValuesService } from '../reference-values/reference-values.service';
import { ReferenceBook } from '../reference-book/entities/reference-book.entity';
import { ReferenceValue } from '../reference-values/entities/reference-value.entity';
import { IconsLoader } from './loaders/icons.loader';
import { IconService } from '../icon/icon.service';
import { Icon } from '../icon/entities/icon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, ReferenceBook, ReferenceValue, Icon]),
  ],
  providers: [
    DefaultCategoriesLoader,
    InitialRefsLoader,
    IconsLoader,
    ReferenceBookService,
    ReferenceValuesService,
    IconService,
  ],
})
export class CommonModule implements OnApplicationBootstrap {
  constructor(
    private readonly defaultCategoriesLoader: DefaultCategoriesLoader,
    private readonly initialRefsLoader: InitialRefsLoader,
    private readonly initIcons: IconsLoader,
  ) {}

  async onApplicationBootstrap() {
    await this.initIcons.init();
    await this.defaultCategoriesLoader.loadDefaultCategories();
    await this.initialRefsLoader.init();
  }
}
