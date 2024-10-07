import { DetailDto, UpdateDetailDto } from '../dtos/details.dto';
import { ProductDetailsService } from '../services/product-details.service';
export declare class ProductDetails {
    private readonly detailService;
    constructor(detailService: ProductDetailsService);
    create(detailDto: DetailDto): Promise<{
        message: string;
    }>;
    find(productId: number): Promise<import("../entities/product-details.entity").ProductDetail[]>;
    update(id: number, updateDto: UpdateDetailDto): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
