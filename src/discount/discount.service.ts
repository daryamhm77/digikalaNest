import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './entity/discount.entiity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateDiscountDto, UpdateDiscountDto } from './dto/discount.dto';
import { DiscountType } from './type.enum';
import { ProductService } from 'src/product/services/product.service';
import { checkNan } from 'src/utils/functions';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity)
    private discountRepository: Repository<DiscountEntity>,
    private productService: ProductService,
  ) {}

  async create(discountDto: CreateDiscountDto) {
    const { code, percent, amount, limit, expires_in, type, productId } =
      discountDto;
    const discountObject: DeepPartial<DiscountEntity> = { code };
    if (type === DiscountType.Product) {
      const product = await this.productService.findOneLean(productId);
      discountDto['productId'] = product.id;
      discountDto['type'] = DiscountType.Product;
    } else {
      discountObject['type'] = DiscountType.Basket;
    }
    if (limit && !isNaN(parseInt(limit.toString()))) {
      discountObject['limit'] = +limit;
    }
    if ((amount && percent) || (!amount && !percent)) {
      throw new BadRequestException(
        'You should send one of the percent or amount',
      );
    }
    if (checkNan(percent)) {
      throw new BadRequestException('percent should be a number!');
    } else if (percent) discountObject['percent'] = +percent;
    if (checkNan(amount)) {
      throw new BadRequestException('amount should be a number!');
    } else if (amount) discountObject['amount'] = +amount;
    if (expires_in && new Date(expires_in).toString() === 'Invalid Date') {
      throw new BadRequestException('date is wrong!');
    } else if (expires_in) discountObject['expiresIn'] = new Date(expires_in);
    const discountCode = this.getDiscountByCode(code);
    if (discountCode) throw new BadRequestException('code is already existed!');
    await this.discountRepository.save(discountObject);
    return {
      message: 'discount created successfully:)',
    };
  }
  async getDiscountByCode(code: string) {
    return this.discountRepository.findOneBy({ code });
  }
  async update(id: number, updateDto: UpdateDiscountDto) {
    const discount = await this.findOne(id);
    if (!discount) throw new NotFoundException('not existed!');
    const { code, percent, amount, limit, expires_in, type, productId } =
      updateDto;
    if (type === DiscountType.Product && productId) {
      const product = await this.productService.findOneLean(productId);
      discount.productId = product.id;
      discount.type = DiscountType.Product;
    } else if (DiscountType.Basket) {
      discount.type = DiscountType.Basket;
    }
    if (limit && !isNaN(parseInt(limit.toString()))) discount.limit = +limit;
    if (amount && percent) {
      throw new BadRequestException(
        'You should send one of the percent or amount',
      );
    }
    if (percent && checkNan(percent))
      throw new BadRequestException('percent should be a number!');
    else if (percent) discount.percent = +percent;
    if (amount && checkNan(amount))
      throw new BadRequestException('amount should be a number!');
    else if (amount) discount.amount = +amount;
    if (expires_in && new Date(expires_in).toString() === 'Invalid Date')
      throw new BadRequestException('Invalid Date!');
    else if (expires_in) discount.expiresIn = new Date(expires_in);
    if (code) {
      const discountCode = this.getDiscountByCode(code);
      if (discountCode && (await discountCode).id !== id) {
        throw new ConflictException();
      }
      discount.code = code;
    }
    await this.discountRepository.save(discount);
    return {
      message: 'updated successfully',
    };
  }
  async find() {
    return this.discountRepository.find();
  }
  async findOne(id: number) {
    return this.discountRepository.findOneBy({ id });
  }
  async delete(id: number) {
    const discount = await this.findOne(id);
    if (!discount) throw new NotFoundException('not existed!');
    await this.discountRepository.delete({ id });
    return {
      message: 'deleted successfully:)',
    };
  }
}
