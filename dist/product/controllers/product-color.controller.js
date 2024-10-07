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
exports.ProductColorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_color_service_1 = require("../services/product-color.service");
const color_dto_1 = require("../dtos/color.dto");
const form_type_enum_1 = require("../enum/form-type.enum");
let ProductColorController = class ProductColorController {
    constructor(colorService) {
        this.colorService = colorService;
    }
    create(colorDto) {
        return this.colorService.create(colorDto);
    }
    find(productId) {
        return this.colorService.find(productId);
    }
    update(id, updateDto) {
        return this.colorService.update(id, updateDto);
    }
    remove(id) {
        return this.colorService.delete(id);
    }
};
exports.ProductColorController = ProductColorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)(form_type_enum_1.FormType.Urlencoded),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [color_dto_1.ColorDto]),
    __metadata("design:returntype", void 0)
], ProductColorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/product/:productId'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductColorController.prototype, "find", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiConsumes)(form_type_enum_1.FormType.Urlencoded),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, color_dto_1.UpdateColorDto]),
    __metadata("design:returntype", void 0)
], ProductColorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductColorController.prototype, "remove", null);
exports.ProductColorController = ProductColorController = __decorate([
    (0, common_1.Controller)('ProductColor'),
    (0, swagger_1.ApiTags)('ProductColor'),
    __metadata("design:paramtypes", [product_color_service_1.ProductColorService])
], ProductColorController);
//# sourceMappingURL=product-color.controller.js.map