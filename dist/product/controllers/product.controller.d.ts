import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(productDto: CreateProductDto): Promise<{
        message: string;
    }>;
    find(): Promise<import("../entities/product.entity").ProductsEntity[]>;
    findOne(id: number): Promise<import("../entities/product.entity").ProductsEntity>;
    update(id: number, updateDto: UpdateProductDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
