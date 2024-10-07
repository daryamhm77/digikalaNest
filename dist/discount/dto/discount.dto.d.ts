export declare class CreateDiscountDto {
    code: string;
    percent: number;
    amount: number;
    limit: number;
    expires_in: string;
    productId: number;
    type: string;
}
declare const UpdateDiscountDto_base: import("@nestjs/common").Type<Partial<CreateDiscountDto>>;
export declare class UpdateDiscountDto extends UpdateDiscountDto_base {
}
export {};
