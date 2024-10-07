"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_module_1 = require("../product/product.module");
const discount_controller_1 = require("./discount.controller");
const discount_service_1 = require("./discount.service");
const discount_entiity_1 = require("./entity/discount.entiity");
let DiscountModule = class DiscountModule {
};
exports.DiscountModule = DiscountModule;
exports.DiscountModule = DiscountModule = __decorate([
    (0, common_1.Module)({
        imports: [product_module_1.ProductModule, typeorm_1.TypeOrmModule.forFeature([discount_entiity_1.DiscountEntity])],
        controllers: [discount_controller_1.DiscountController],
        providers: [discount_service_1.DiscountService],
        exports: [discount_service_1.DiscountService, typeorm_1.TypeOrmModule],
    })
], DiscountModule);
//# sourceMappingURL=dicount.module.js.map