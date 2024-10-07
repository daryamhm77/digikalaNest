export declare class AddSizeDto {
    size: string;
    productId: number;
    price?: number;
    count?: number;
    discount?: number;
    active_discount?: boolean;
}
declare const UpdateSizeDto_base: import("@nestjs/common").Type<Partial<AddSizeDto>>;
export declare class UpdateSizeDto extends UpdateSizeDto_base {
}
export {};
