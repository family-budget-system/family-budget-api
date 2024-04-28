import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReferenceBookService } from './reference-book.service';
import { CreateReferenceBookDto } from './dto/create-reference-book.dto';
import { UpdateReferenceBookDto } from './dto/update-reference-book.dto';

@Controller('reference-book')
export class ReferenceBookController {
  constructor(private readonly referenceBookService: ReferenceBookService) {}

  @Post()
  create(@Body() createReferenceBookDto: CreateReferenceBookDto) {
    return this.referenceBookService.create(createReferenceBookDto);
  }

  @Get()
  findAll() {
    return this.referenceBookService.findAll();
  }

  @Get(':refCodeName')
  findOne(@Param('refCodeName') refCodeName: string) {
    return this.referenceBookService.findOne(refCodeName);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReferenceBookDto: UpdateReferenceBookDto,
  ) {
    return this.referenceBookService.update(+id, updateReferenceBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referenceBookService.remove(+id);
  }
}
