import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ProductType } from '../enum/type.enum';
import { toBoolean } from 'src/utils/functions';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

  async create(productDto: CreateProductDto) {
    
    const {
      title,
      content,
      slug,
      code,
      type,
      price,
      count,
      discount,
      active_discount,
    } = productDto;
  
    const productObject: DeepPartial<ProductsEntity> = {
      content,
      slug,
      title,
      code,
      discount,
      active_discount: toBoolean(active_discount),
    };
  
    this.validatePriceCountDiscount(productDto);
  
    if (type === ProductType.Single) { 
      if (!price || !count) {
        throw new BadRequestException(
          'Price and count must be provided for Single products.',
        );
      }
      Object.assign(productObject, { price, count, discount, type }); 
    } else if (
      [ProductType.Coloring, ProductType.Sizing].includes(type as any)
    ) {
      Object.assign(productObject, { type, count: null }); 
    } else {
      throw new BadRequestException('type is not valid!');
    }
  
    try {
      await this.productsRepository.save(productObject);
      this.logger.debug(`Product created successfully: ${JSON.stringify(productObject)}`);
    } catch (error) {
      this.logger.error(`Failed to create product: ${error.message}`, error.stack);
      throw error;
    }

    return {
      message: 'created successfully :)',
    };
  }

  private validatePriceCountDiscount(productDto: CreateProductDto) {
    const { price, count, discount } = productDto;

    if (price !== undefined && price < 0) {
      throw new BadRequestException('Price must be a positive number.');
    }
    if (count !== undefined && count < 0) {
      throw new BadRequestException('Count must be a positive number.');
    }
    if (discount !== undefined && (discount < 0 || discount > 100)) {
      throw new BadRequestException('Discount must be between 0 and 100.');
    }
  }

  async update(id: number, updateDto: UpdateProductDto) {
    const {
      title,
      content,
      slug,
      code,
      type,
      price,
      count,
      discount,
      active_discount,
    } = updateDto;
    const product = await this.findOneLean(id);

    Object.assign(product, {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(code && { code }),
      ...(content && { content }),
      ...(discount !== undefined &&
        (discount > 0 || discount < 100) && { discount }),
      ...(active_discount !== undefined && {
        active_discount: toBoolean(active_discount),
      }),
    });

    if (type === ProductType.Single) {
      if (!price || !count) {
        throw new BadRequestException(
          'Price and count must be provided for Single products.',
        );
      }
      Object.assign(product, {
        ...(price !== undefined && price > 0 && { price }),
        ...(count !== undefined && count > 0 && { count }),
        type,
      });
    } else if (
      [ProductType.Coloring, ProductType.Sizing].includes(type as any)
    ) {
      Object.assign(product, { type, count: null }); // Assign 'count' as null or a default value
    } else {
      throw new BadRequestException('type is not valid!');
    }

    try {
      await this.productsRepository.save(product);
      this.logger.debug(`Product updated successfully: ${JSON.stringify(product)}`);
    } catch (error) {
      this.logger.error(`Failed to update product: ${error.message}`, error.stack);
      throw error;
    }

    return {
      message: 'updated successfully :)',
    };
  }

  async find() {
    return this.productsRepository.find({
      where: {},
      relations: {
        colors: true,
        details: true,
        sizes: true,
      },
      select: {
        details: {
          key: true,
          value: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { colors: true, sizes: true, details: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findOneLean(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  async delete(id: number) {
    await this.findOneLean(id);
    await this.productsRepository.delete({ id });
    return {
      message: 'deleted successfully:)',
    };
  }
}
