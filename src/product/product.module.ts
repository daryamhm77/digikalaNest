import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/product.entity';
import { ProductColorsEntity } from './entities/product-colors.entity';
import { ProductSizeEntity } from './entities/product-size.entity';
import { ProductDetail } from './entities/product-details.entity';
import { ProductController } from './controllers/product.controller';
import { ProductColorController } from './controllers/product-color.controller';
import { ProductSizeController } from './controllers/product-size.controller';
import { ProductDetails } from './controllers/product-detail.controller';
import { ProductService } from './services/product.service';
import { ProductColorService } from './services/product-color.service';
import { ProductSizeService } from './services/product-size.service';
import { ProductDetailsService } from './services/product-details.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsEntity,
      ProductColorsEntity,
      ProductSizeEntity,
      ProductDetail,
    ]),
  ],
  controllers: [
    ProductController,
    ProductColorController,
    ProductSizeController,
    ProductDetails,
  ],
  providers: [
    ProductService,
    ProductColorService,
    ProductSizeService,
    ProductDetailsService,
  ],
  exports: [
    ProductService,
    ProductColorService,
    ProductSizeService,
    ProductDetailsService,
    TypeOrmModule,
  ],
})
export class ProductModule {}
