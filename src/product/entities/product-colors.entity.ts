import { EntityNames } from 'src/common/enum/entity.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsEntity } from './product.entity';

@Entity(EntityNames.ProductColors)
export class ProductColorsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  productId: number;
  @Column()
  name: string;
  @Column()
  code: string;
  @Column({ type: 'decimal' })
  price: number;
  @Column({ nullable: true })
  count: number;
  @Column({ type: 'decimal', default: 0 })
  discount: number;
  @Column({ default: false })
  active_discount: boolean;
  @ManyToOne(() => ProductsEntity, (product) => product.colors, {
    onDelete: 'CASCADE',
  })
  product: ProductsEntity;
}
