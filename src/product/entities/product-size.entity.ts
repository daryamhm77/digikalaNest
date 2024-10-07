import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsEntity } from './product.entity';

@Entity()
export class ProductSizeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  productId: number;
  @Column()
  size: string;
  @Column()
  count: number;
  @Column({ type: 'decimal' })
  price: number;
  @Column({ type: 'decimal', default: 0 })
  discount: number;
  @Column({ default: false })
  active_discount: boolean;
  @ManyToOne(() => ProductsEntity, (product) => product.sizes, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;
}
