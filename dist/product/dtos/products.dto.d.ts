export declare class CreateProductDto {
    title: string;
    content: string;
    slug: string;
    code: string;
    type: string;
    price: number;
    count: number;
    discount: number;
    active_discount: boolean;
}
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
}
export {};
