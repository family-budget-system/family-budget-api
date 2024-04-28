import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReferenceValue } from '../../reference-values/entities/reference-value.entity';

@Entity()
export class ReferenceBook {
  @PrimaryGeneratedColumn({ name: 'ref_id' })
  id: number;

  @Column()
  ref_code_name: string;

  @OneToMany(() => ReferenceValue, (refValue) => refValue.id, {
    onDelete: 'CASCADE',
  })
  ref_values: ReferenceValue[];
}
