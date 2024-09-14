import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  slug?: string;
}
