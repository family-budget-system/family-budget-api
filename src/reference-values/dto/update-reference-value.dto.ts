import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenceValueDto } from './create-reference-value.dto';

export class UpdateReferenceValueDto extends PartialType(CreateReferenceValueDto) {}
