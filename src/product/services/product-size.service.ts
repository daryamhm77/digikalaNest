import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSizeEntity } from '../entities/product-size.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductsEntity } from '../entities/product.entity';
import { AddSizeDto, UpdateSizeDto } from '../dtos/size.dto';
import { ProductType } from '../enum/type.enum';
import { toBoolean } from 'src/utils/functions';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectRepository(ProductSizeEntity)
    private sizeRepository: Repository<ProductSizeEntity>,
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
    private dataSource: DataSource,
  ) {}

  async create(sizeDto: AddSizeDto) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const { productId, price, count, size, discount, active_discount } =
        sizeDto;
      const product = await queryRunner.manager.findOneBy(ProductsEntity, {
        id: productId,
      });
      if (product.type !== ProductType.Sizing)
        throw new BadRequestException("product type isn't sizing");
      if (!product) throw new NotFoundException('not found product');
      await queryRunner.manager.insert(ProductSizeEntity, {
        size,
        productId,
        count,
        discount,
        active_discount: toBoolean(active_discount),
        price,
      });
      if (!isNaN(parseInt(count.toString())) && +count > 0) {
        product.count =
          parseInt(product.count.toString()) + parseInt(count.toString());
        await queryRunner.manager.save(ProductsEntity, product);
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return {
        message: 'created size of product successful',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async update(id: number, updateDto: UpdateSizeDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      queryRunner.startTransaction();
      const {
        productId,
        price,
        count,
        size: sizeTitle,
        discount,
        active_discount,
      } = updateDto;
      const product = await queryRunner.manager.findOneBy(ProductsEntity, {
        id: productId,
      });
      if (!product) throw new NotFoundException('not found product');
      const size = await queryRunner.manager.findOneBy(ProductSizeEntity, {
        id,
      });
      if (!size) throw new NotFoundException('not found product');
      if (sizeTitle) size.size = sizeTitle;
      if (discount) size.discount = discount;
      if (active_discount) size.active_discount = toBoolean(active_discount);
      if (price) size.price = price;
      const previousCount = size.count;
      if (count && !isNaN(parseInt(count.toString())) && +count > 0) {
        product.count =
          parseInt(product.count.toString()) -
          parseInt(previousCount.toString());
        product.count =
          parseInt(product.count.toString()) + parseInt(count.toString());
        size.count = count;
        await queryRunner.manager.save(ProductsEntity, product);
      }
      await queryRunner.manager.save(ProductSizeEntity, size);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new error();
    }
  }
  async find(productId: number) {
    return this.sizeRepository.find({
      where: { productId },
    });
  }
  async findOne(id: number) {
    const size = await this.sizeRepository.findOne({
      where: { id },
    });
    if (!size) throw new NotFoundException();
    return size;
  }
  
  async delete(id: number) {
    const size = await this.findOne(id);
    const product = await this.productRepository.findOne({
      where: { id: size.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // Adjust the product's count before deleting the size
      if (size.count > 0) {
        product.count -= size.count;
        await queryRunner.manager.save(ProductsEntity, product);
      }

      await queryRunner.manager.delete(ProductSizeEntity, { id });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
