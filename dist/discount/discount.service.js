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
exports.DiscountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const discount_entiity_1 = require("./entity/discount.entiity");
const typeorm_2 = require("typeorm");
const type_enum_1 = require("./type.enum");
const product_service_1 = require("../product/services/product.service");
const functions_1 = require("../utils/functions");
let DiscountService = class DiscountService {
    constructor(discountRepository, productService) {
        this.discountRepository = discountRepository;
        this.productService = productService;
    }
    async create(discountDto) {
        const { code, percent, amount, limit, expires_in, type, productId } = discountDto;
        const discountObject = { code };
        if (type === type_enum_1.DiscountType.Product) {
            const product = await this.productService.findOneLean(productId);
            discountDto['productId'] = product.id;
            discountDto['type'] = type_enum_1.DiscountType.Product;
        }
        else {
            discountObject['type'] = type_enum_1.DiscountType.Basket;
        }
        if (limit && !isNaN(parseInt(limit.toString()))) {
            discountObject['limit'] = +limit;
        }
        if ((amount && percent) || (!amount && !percent)) {
            throw new common_1.BadRequestException('You should send one of the percent or amount');
        }
        if ((0, functions_1.checkNan)(percent)) {
            throw new common_1.BadRequestException('percent should be a number!');
        }
        else if (percent)
            discountObject['percent'] = +percent;
        if ((0, functions_1.checkNan)(amount)) {
            throw new common_1.BadRequestException('amount should be a number!');
        }
        else if (amount)
            discountObject['amount'] = +amount;
        if (expires_in && new Date(expires_in).toString() === 'Invalid Date') {
            throw new common_1.BadRequestException('date is wrong!');
        }
        else if (expires_in)
            discountObject['expiresIn'] = new Date(expires_in);
        const discountCode = this.getDiscountByCode(code);
        if (discountCode)
            throw new common_1.BadRequestException('code is already existed!');
        await this.discountRepository.save(discountObject);
        return {
            message: 'discount created successfully:)',
        };
    }
    async getDiscountByCode(code) {
        return this.discountRepository.findOneBy({ code });
    }
    async update(id, updateDto) {
        const discount = await this.findOne(id);
        if (!discount)
            throw new common_1.NotFoundException('not existed!');
        const { code, percent, amount, limit, expires_in, type, productId } = updateDto;
        if (type === type_enum_1.DiscountType.Product && productId) {
            const product = await this.productService.findOneLean(productId);
            discount.productId = product.id;
            discount.type = type_enum_1.DiscountType.Product;
        }
        else if (type_enum_1.DiscountType.Basket) {
            discount.type = type_enum_1.DiscountType.Basket;
        }
        if (limit && !isNaN(parseInt(limit.toString())))
            discount.limit = +limit;
        if (amount && percent) {
            throw new common_1.BadRequestException('You should send one of the percent or amount');
        }
        if (percent && (0, functions_1.checkNan)(percent))
            throw new common_1.BadRequestException('percent should be a number!');
        else if (percent)
            discount.percent = +percent;
        if (amount && (0, functions_1.checkNan)(amount))
            throw new common_1.BadRequestException('amount should be a number!');
        else if (amount)
            discount.amount = +amount;
        if (expires_in && new Date(expires_in).toString() === 'Invalid Date')
            throw new common_1.BadRequestException('Invalid Date!');
        else if (expires_in)
            discount.expiresIn = new Date(expires_in);
        if (code) {
            const discountCode = this.getDiscountByCode(code);
            if (discountCode && (await discountCode).id !== id) {
                throw new common_1.ConflictException();
            }
            discount.code = code;
        }
        await this.discountRepository.save(discount);
        return {
            message: 'updated successfully',
        };
    }
    async find() {
        return this.discountRepository.find();
    }
    async findOne(id) {
        return this.discountRepository.findOneBy({ id });
    }
    async delete(id) {
        const discount = await this.findOne(id);
        if (!discount)
            throw new common_1.NotFoundException('not existed!');
        await this.discountRepository.delete({ id });
        return {
            message: 'deleted successfully:)',
        };
    }
};
exports.DiscountService = DiscountService;
exports.DiscountService = DiscountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(discount_entiity_1.DiscountEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService])
], DiscountService);
//# sourceMappingURL=discount.service.js.map