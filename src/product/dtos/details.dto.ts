import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DetailDto {
  @ApiProperty()
  @IsNumber()
  productId: number; // Ensures productId is a number

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  key?: string; // Optional and must be a string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  value?: string; // Optional and must be a string
}

export class UpdateDetailDto extends PartialType(DetailDto) {}
