export interface IUser {
  id: string;
  email: string;
}

export enum BillTypeEnum {
  CASH = 'cash',
  CARD = 'card',
  BANK_BILL = 'bank_bill',
  CREDIT = 'credit',
  DEPOSIT = 'deposit',
}

export enum TransactionTypeEnum {
  consumption = 'consumption',
  income = 'income',
}
