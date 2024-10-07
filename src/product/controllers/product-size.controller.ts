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
import { FormType } from '../enum/form-type.enum';
import { ProductSizeService } from '../services/product-size.service';
import { AddSizeDto, UpdateSizeDto } from '../dtos/size.dto';

@Controller('ProductSize')
@ApiTags('ProductSize')
export class ProductSizeController {
  constructor(private readonly sizeService: ProductSizeService) {}
  @Post()
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() sizeDto: AddSizeDto) {
    return this.sizeService.create(sizeDto);
  }
  @Get('/product/:productId')
  find(@Param('productId', ParseIntPipe) productId: number) {
    return this.sizeService.find(productId);
  }
  @Put('/:id')
  @ApiConsumes(FormType.Urlencoded)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSizeDto,
  ) {
    return this.sizeService.update(id, updateDto);
  }
  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sizeService.delete(id);
  }
}
