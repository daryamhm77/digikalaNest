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
import { FormType } from 'src/product/enum/form-type.enum';
import { CreateDiscountDto, UpdateDiscountDto } from './dto/discount.dto';
import { DiscountService } from './discount.service';

@Controller('Discount')
@ApiTags('Discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}
  @Post()
  @ApiConsumes(FormType.Urlencoded)
  create(@Body() createDto: CreateDiscountDto) {
    return this.discountService.create(createDto);
  }
  @Get()
  find() {
    return this.discountService.find();
  }
  @Put('/:id')
  @ApiConsumes(FormType.Urlencoded)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(id, updateDto);
  }
  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.remove(id);
  }
}
