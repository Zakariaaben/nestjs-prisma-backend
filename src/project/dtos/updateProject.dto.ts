import { Category, Image } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true' || value === true;
  })
  published: boolean;

  @IsNumber()
  @Transform(({ value }) => {
    return value === null ? null : parseInt(value);
  })
  @ValidateIf((object, value) => {
    return value !== null;
  })
  @IsOptional()
  category_id: Category['id'] | null;

  @IsOptional()
  @IsNumber({}, { each: true })
  @IsArray()
  @Transform(({ value }) => value.map((id) => parseInt(id)))
  images?: Image['id'][];
}
