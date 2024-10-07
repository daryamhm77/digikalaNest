import { DiscountEntity } from './entity/discount.entiity';
import { Repository } from 'typeorm';
import { CreateDiscountDto, UpdateDiscountDto } from './dto/discount.dto';
import { ProductService } from 'src/product/services/product.service';
export declare class DiscountService {
    private discountRepository;
    private productService;
    constructor(discountRepository: Repository<DiscountEntity>, productService: ProductService);
    create(discountDto: CreateDiscountDto): Promise<{
        message: string;
    }>;
    getDiscountByCode(code: string): Promise<DiscountEntity>;
    update(id: number, updateDto: UpdateDiscountDto): Promise<{
        message: string;
    }>;
    find(): Promise<DiscountEntity[]>;
    findOne(id: number): Promise<DiscountEntity>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
