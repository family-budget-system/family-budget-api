import { Module } from '@nestjs/common';
import { ReferenceBookService } from './reference-book.service';
import { ReferenceBookController } from './reference-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceBook } from './entities/reference-book.entity';

@Module({
  controllers: [ReferenceBookController],
  providers: [ReferenceBookService],
  imports: [TypeOrmModule.forFeature([ReferenceBook])],
})
export class ReferenceBookModule {}
