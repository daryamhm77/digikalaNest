import { ProductSizeService } from '../services/product-size.service';
import { AddSizeDto, UpdateSizeDto } from '../dtos/size.dto';
export declare class ProductSizeController {
    private readonly sizeService;
    constructor(sizeService: ProductSizeService);
    create(sizeDto: AddSizeDto): Promise<{
        message: string;
    }>;
    find(productId: number): Promise<import("../entities/product-size.entity").ProductSizeEntity[]>;
    update(id: number, updateDto: UpdateSizeDto): Promise<void>;
    remove(id: number): Promise<void>;
}
