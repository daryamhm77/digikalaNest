"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetails = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const details_dto_1 = require("../dtos/details.dto");
const product_details_service_1 = require("../services/product-details.service");
const form_type_enum_1 = require("../enum/form-type.enum");
let ProductDetails = class ProductDetails {
    constructor(detailService) {
        this.detailService = detailService;
    }
    create(detailDto) {
        return this.detailService.create(detailDto);
    }
    find(productId) {
        return this.detailService.find(productId);
    }
    update(id, updateDto) {
        return this.detailService.update(id, updateDto);
    }
    delete(id) {
        return this.detailService.delete(id);
    }
};
exports.ProductDetails = ProductDetails;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)(form_type_enum_1.FormType.Urlencoded),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [details_dto_1.DetailDto]),
    __metadata("design:returntype", void 0)
], ProductDetails.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/product/:productId'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductDetails.prototype, "find", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiConsumes)(form_type_enum_1.FormType.Urlencoded),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, details_dto_1.UpdateDetailDto]),
    __metadata("design:returntype", void 0)
], ProductDetails.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductDetails.prototype, "delete", null);
exports.ProductDetails = ProductDetails = __decorate([
    (0, common_1.Controller)('ProductDetails'),
    (0, swagger_1.ApiTags)('ProductDetails'),
    __metadata("design:paramtypes", [product_details_service_1.ProductDetailsService])
], ProductDetails);
//# sourceMappingURL=product-detail.controller.js.map