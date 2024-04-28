import { Module } from '@nestjs/common';
import { ReferenceValuesService } from './reference-values.service';
import { ReferenceValuesController } from './reference-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceValue } from './entities/reference-value.entity';
import { ReferenceBook } from "../reference-book/entities/reference-book.entity";

@Module({
  controllers: [ReferenceValuesController],
  providers: [ReferenceValuesService],
  imports: [TypeOrmModule.forFeature([ReferenceValue, ReferenceBook])],
})
export class ReferenceValuesModule {}
