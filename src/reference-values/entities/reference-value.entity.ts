import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReferenceBook } from '../../reference-book/entities/reference-book.entity';

@Entity()
export class ReferenceValue {
  @PrimaryGeneratedColumn({ name: 'ref_value_id' })
  id: number;

  @Column()
  code_name: string;

  @Column()
  value: string;

  @ManyToOne(() => ReferenceBook, (refBook) => refBook.ref_values)
  @JoinColumn({ name: 'ref_id' })
  ref_book: ReferenceBook;
}
