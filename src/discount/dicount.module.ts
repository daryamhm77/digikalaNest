import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { DiscountEntity } from './entity/discount.entiity';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([DiscountEntity])],
  controllers: [DiscountController],
  providers: [DiscountService],
  exports: [DiscountService, TypeOrmModule],
})
export class DiscountModule {}
