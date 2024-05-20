import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReferenceBook } from '../../reference-book/entities/reference-book.entity';
import { Bill } from '../../bill/entities/bill.entity';

@Entity()
export class ReferenceValue {
  @PrimaryGeneratedColumn({ name: 'ref_value_id' })
  id: number;

  @Column()
  code_name: string;

  @Column()
  value: string;

  @OneToMany(() => Bill, (bill) => bill.currency, {
    onDelete: 'CASCADE',
  })
  bills: Bill[];

  @ManyToOne(() => ReferenceBook, (refBook) => refBook.ref_values)
  @JoinColumn({ name: 'ref_id' })
  ref_book: ReferenceBook;
}
