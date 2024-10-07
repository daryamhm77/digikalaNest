import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsEntity } from './product.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  productId: number;
  @Column()
  key: string;
  @Column()
  value: string;
  @ManyToOne(() => ProductsEntity, (product) => product.details, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;
}
