import { EntityNames } from 'src/common/enum/entity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountType } from '../type.enum';

@Entity(EntityNames.Discount)
export class DiscountEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  code: string;
  @Column({ type: 'decimal', nullable: true })
  percent: number;
  @Column({ type: 'decimal', nullable: true })
  amount: number;
  @Column({ nullable: true })
  limit: number;
  @Column({ nullable: true })
  usage: number;
  @Column({ type: 'timestamp', nullable: true })
  expiresIn: Date;
  @Column({ nullable: true })
  productId: number;
  @Column({ type: 'enum', enum: DiscountType })
  type: string;
}
