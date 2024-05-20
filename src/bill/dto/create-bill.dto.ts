import { IsNotEmpty } from 'class-validator';

export class CreateBillDto {
  title: string;

  @IsNotEmpty()
  billType: BillTypeEnum;

  @IsNotEmpty()
  currencyId: number;

  balance: number;
}

export enum BillTypeEnum {
  CASH = 'cash',
  CARD = 'card',
  BANK_BILL = 'bank_bill',
  CREDIT = 'credit',
  DEPOSIT = 'deposit',
}
