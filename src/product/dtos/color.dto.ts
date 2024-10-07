import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ColorDto {
  @ApiProperty()
  @IsString()
  name: string; // Name should be a string

  @ApiProperty()
  @IsString()
  code: string; // Code should be a string

  @ApiProperty()
  @IsNumber()
  productId: number; // ProductId should be a number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number; // Price is optional and should be a non-negative number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  count?: number; // Count is optional and should be a non-negative number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number; // Discount is optional and should be a non-negative number

  @ApiPropertyOptional({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  active_discount?: boolean; // Active_discount is optional and should be a boolean
}

export class UpdateColorDto extends PartialType(ColorDto) {}
