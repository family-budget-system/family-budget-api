import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReferenceValuesService } from './reference-values.service';
import { CreateReferenceValueDto } from './dto/create-reference-value.dto';
import { UpdateReferenceValueDto } from './dto/update-reference-value.dto';

@Controller('reference-values')
export class ReferenceValuesController {
  constructor(
    private readonly referenceValuesService: ReferenceValuesService,
  ) {}

  @Post()
  create(@Body() createReferenceValueDto: CreateReferenceValueDto) {
    return this.referenceValuesService.create(createReferenceValueDto);
  }

  @Get()
  findRefValuesByRefCodeName(@Param('refCodeName') refCodeName: string) {
    return this.referenceValuesService.findAllByRefCodeName(refCodeName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referenceValuesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReferenceValueDto: UpdateReferenceValueDto,
  ) {
    return this.referenceValuesService.update(+id, updateReferenceValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referenceValuesService.remove(+id);
  }
}
