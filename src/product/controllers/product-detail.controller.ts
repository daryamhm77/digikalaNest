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
import { DetailDto, UpdateDetailDto } from '../dtos/details.dto';
import { ProductDetailsService } from '../services/product-details.service';
import { FormType } from '../enum/form-type.enum';

@Controller('ProductDetails')
@ApiTags('ProductDetails')
export class ProductDetails {
  constructor(private readonly detailService: ProductDetailsService) {}
  @Post()
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() detailDto: DetailDto) {
    return this.detailService.create(detailDto);
  }
  @Get('/product/:productId')
  find(@Param('productId', ParseIntPipe) productId: number) {
    return this.detailService.find(productId);
  }
  @Put('/:id')
  @ApiConsumes(FormType.Urlencoded)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDetailDto,
  ) {
    return this.detailService.update(id, updateDto);
  }
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.detailService.delete(id);
  }
}
