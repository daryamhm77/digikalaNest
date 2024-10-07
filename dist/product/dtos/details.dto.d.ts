export declare class DetailDto {
    productId: number;
    key?: string;
    value?: string;
}
declare const UpdateDetailDto_base: import("@nestjs/common").Type<Partial<DetailDto>>;
export declare class UpdateDetailDto extends UpdateDetailDto_base {
}
export {};
