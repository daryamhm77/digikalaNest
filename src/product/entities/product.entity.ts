import { EntityNames } from 'src/common/enum/entity.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetail } from './product-details.entity';
import { ProductColorsEntity } from './product-colors.entity';
import { ProductSizeEntity } from './product-size.entity';

@Entity(EntityNames.Products)
export class ProductsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  slug: string;
  @Column()
  code: string;
  @Column({ nullable: true })
  count: number;
  @Column({ nullable: true, type: 'decimal' })
  price: number;
  @Column({ nullable: true, type: 'decimal', default: 0 })
  discount: number;
  @Column({ nullable: true, default: false })
  active_discount: boolean;
  @CreateDateColumn()
  created_at: Date;
  @Column()
  type: string;
  @OneToMany(() => ProductDetail, (details) => details.product)
  details: ProductDetail[];
  @OneToMany(() => ProductColorsEntity, (colors) => colors.product)
  colors: ProductColorsEntity[];
  @OneToMany(() => ProductSizeEntity, (sizes) => sizes.product)
  sizes: ProductSizeEntity[];
}
