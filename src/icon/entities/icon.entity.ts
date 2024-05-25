import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('icons')
export class Icon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  svgContent: string;

  @OneToMany(() => Category, (category) => category.icon, {
    onDelete: 'CASCADE',
  })
  categories: Category[];
}
