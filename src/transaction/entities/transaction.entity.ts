import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Bill } from '../../bill/entities/bill.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  id: number;

  @Column()
  amount: number;

  @Column()
  transaction_type: string;

  @Column()
  payment_date: Date;

  @Column()
  payer: string;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Bill, (bill) => bill.transactions)
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
