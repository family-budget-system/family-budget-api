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

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'transaction_id' })
  id: number;

  @Column()
  title: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Bill, (bill) => bill.transactions)
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
