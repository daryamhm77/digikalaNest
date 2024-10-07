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
import { ProductColorService } from '../services/product-color.service';
import { ColorDto, UpdateColorDto } from '../dtos/color.dto';
import { FormType } from '../enum/form-type.enum';

@Controller('ProductColor')
@ApiTags('ProductColor')
export class ProductColorController {
  constructor(private readonly colorService: ProductColorService) {}
  @Post()
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() colorDto: ColorDto) {
    return this.colorService.create(colorDto);
  }
  @Get('/product/:productId')
  find(@Param('productId', ParseIntPipe) productId: number) {
    return this.colorService.find(productId);
  }
  @Put('/:id')
  @ApiConsumes(FormType.Urlencoded)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateColorDto,
  ) {
    return this.colorService.update(id, updateDto);
  }
  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.delete(id);
  }
}
