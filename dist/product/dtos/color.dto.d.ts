export declare class ColorDto {
    name: string;
    code: string;
    productId: number;
    price?: number;
    count?: number;
    discount?: number;
    active_discount?: boolean;
}
declare const UpdateColorDto_base: import("@nestjs/common").Type<Partial<ColorDto>>;
export declare class UpdateColorDto extends UpdateColorDto_base {
}
export {};
