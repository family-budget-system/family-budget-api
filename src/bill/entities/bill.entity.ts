import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from '../../user/entities/user.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn({ name: 'bill_id' })
  id: number;

  @Column()
  title: string;

  @Column()
  billType: string;

  @Column()
  currency: string;

  @Column()
  balance: number;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.bill, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
