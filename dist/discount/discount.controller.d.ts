import { CreateDiscountDto, UpdateDiscountDto } from './dto/discount.dto';
import { DiscountService } from './discount.service';
export declare class DiscountController {
    private readonly discountService;
    constructor(discountService: DiscountService);
    create(createDto: CreateDiscountDto): Promise<{
        message: string;
    }>;
    find(): Promise<import("./entity/discount.entiity").DiscountEntity[]>;
    update(id: number, updateDto: UpdateDiscountDto): Promise<{
        message: string;
    }>;
    remove(id: number): any;
}
