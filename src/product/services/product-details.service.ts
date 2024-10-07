import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetail } from '../entities/product-details.entity';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';
import { DetailDto, UpdateDetailDto } from '../dtos/details.dto';
@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectRepository(ProductDetail)
    private detailRepository: Repository<ProductDetail>,
    private productService: ProductService,
  ) {}
  async create(detailDto: DetailDto) {
    const { key, value, productId } = detailDto;
    await this.productService.findOne(productId);
    await this.detailRepository.insert({
      key,
      value,
      productId,
    });
    return {
      message: 'created successfully:)',
    };
  }
  async update(id: number, updateDto: UpdateDetailDto) {
    const { key, value, productId } = updateDto;
    const detail = await this.findOne(id);
    if (productId) {
      await this.productService.findOne(productId);
      detail.productId = productId;
    }
    if (key) detail.key = key;
    if (value) detail.value = value;
    await this.detailRepository.save(detail);
    return {
      message: 'updated detail of product successful',
    };
  }
  async find(productId: number) {
    return await this.detailRepository.find({ where: { productId } });
  }
  async findOne(id: number) {
    const detail = await this.detailRepository.findOne({
      where: { id },
    });
    if (!detail) throw new NotFoundException();
    return detail;
  }
  async delete(id: number) {
    await this.findOne(id);
    await this.detailRepository.delete({ id });
    return {
      message: 'deleted successfully:)',
    };
  }
}
