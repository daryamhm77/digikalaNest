import { ProductColorService } from '../services/product-color.service';
import { ColorDto, UpdateColorDto } from '../dtos/color.dto';
export declare class ProductColorController {
    private readonly colorService;
    constructor(colorService: ProductColorService);
    create(colorDto: ColorDto): Promise<void>;
    find(productId: number): Promise<import("../entities/product-colors.entity").ProductColorsEntity[]>;
    update(id: number, updateDto: UpdateColorDto): Promise<void>;
    remove(id: number): Promise<void>;
}
