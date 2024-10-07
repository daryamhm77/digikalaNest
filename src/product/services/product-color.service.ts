import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductColorsEntity } from '../entities/product-colors.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductsEntity } from '../entities/product.entity';
import { ColorDto, UpdateColorDto } from '../dtos/color.dto';
import { ProductType } from '../enum/type.enum';
import { toBoolean } from 'src/utils/functions';


@Injectable()
export class ProductColorService {
  constructor(
    @InjectRepository(ProductColorsEntity)
    private colorRepository: Repository<ProductColorsEntity>,
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
    private dataSource: DataSource,
  ) {}
  async create(colorDto: ColorDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      queryRunner.startTransaction();
      const { name, code, productId, price, count, discount, active_discount } =
        colorDto;
      const product = await queryRunner.manager.findOneBy(ProductsEntity, {
        id: productId,
      });
      if (product.type !== ProductType.Coloring) {
        throw new BadRequestException("product type isn't coloring");
      }
      if (!product) throw new NotFoundException('not found product');
      await queryRunner.manager.insert(ProductColorsEntity, {
        name,
        code,
        discount,
        active_discount: toBoolean(active_discount),
        productId,
        price,
        count,
      });
      if (!isNaN(parseInt(count.toString())) && +count > 0) {
        product.count =
          parseInt(product.count.toString()) + parseInt(count.toString());
        queryRunner.manager.save(ProductsEntity, product);
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async update(id: number, updateDto: UpdateColorDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      queryRunner.startTransaction();
      const { name, code, productId, price, count, discount, active_discount } =
        updateDto;
      const product = await queryRunner.manager.findOneBy(ProductsEntity, {
        id: productId,
      });
      if (!product) throw new NotFoundException('not found product');
      const color = await queryRunner.manager.findOneBy(ProductColorsEntity, {
        id,
      });
      if (!color) throw new NotFoundException('not found product');
      if (name) color.name = name;
      if (code) color.code = code;
      if (price) color.price = price;
      if (discount) color.discount = discount;
      if (active_discount) color.active_discount = toBoolean(active_discount);
      const prevCount = color.count;
      if (count && !isNaN(parseInt(count.toString())) && +count > 0) {
        product.count =
          parseInt(product.count.toString()) - parseInt(prevCount.toString());
        product.count =
          parseInt(product.count.toString()) + parseInt(count.toString());
        color.count = count;
        await queryRunner.manager.save(ProductsEntity, product);
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
  async find(productId: number) {
    return await this.colorRepository.find({
      where: { productId },
    });
  }
  async findOne(id: number) {
    const color = await this.colorRepository.findOne({
      where: { id },
    });
    if (!color) throw new NotFoundException();
    return color;
  }
  async delete(id: number) {
    const color = await this.findOne(id);
    const product = await this.productRepository.findOne({
      where: { id: color.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      // Adjust the product's count before deleting the color
      if (color.count > 0) {
        product.count -= color.count;
        await queryRunner.manager.save(ProductsEntity, product);
      }

      await queryRunner.manager.delete(ProductColorsEntity, { id });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
