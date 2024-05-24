import { IsNotEmpty } from 'class-validator';
import { BillTypeEnum } from '../../@types';

export class CreateBillDto {
  title: string;

  @IsNotEmpty()
  billType: BillTypeEnum;

  @IsNotEmpty()
  currencyId: number;

  balance: number;
}
