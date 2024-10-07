import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class AddSizeDto {
  @ApiProperty()
  @IsString()
  size: string;

  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  count?: number; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number; 
  @ApiPropertyOptional({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  active_discount?: boolean; 
}

export class UpdateSizeDto extends PartialType(AddSizeDto) {}
