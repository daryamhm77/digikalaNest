import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { FormType } from '../enum/form-type.enum';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Controller('Product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() productDto: CreateProductDto) {
    return this.productService.create(productDto);
  }

  @Get()
  find() {
    return this.productService.find();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Put('/:id')
  @ApiConsumes(FormType.Urlencoded)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateDto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
