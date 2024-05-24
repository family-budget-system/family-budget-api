import { TransactionTypeEnum } from '../../@types';

export class CreateTransactionDto {
  transactionType: TransactionTypeEnum;
  billId: number;
  amount: number;
  categoryId: number;

  // format yyyy-mm-dd
  paymentDate: string;
  payer: string;
  comment: string;
}
