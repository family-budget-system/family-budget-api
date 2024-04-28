import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenceBookDto } from './create-reference-book.dto';

export class UpdateReferenceBookDto extends PartialType(
  CreateReferenceBookDto,
) {}
