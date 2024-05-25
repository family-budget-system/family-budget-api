import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { User } from '../user/entities/user.entity';
import { Icon } from "../icon/entities/icon.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, User, Icon])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
