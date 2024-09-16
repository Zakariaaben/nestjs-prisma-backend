import { Logger } from '@nestjs/common';
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
import { isNull } from 'util';

export class createProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug?: string;

  @IsNumber()
  @Transform(({ value }) => {
    return value === null ? null : parseInt(value);
  })
  @ValidateIf((object, value) => {
    return value !== null;
  })
  category_id: Category['id'] | null;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true' || value === true;
  })
  published: boolean;

  @IsNumber({}, { each: true })
  @IsArray()
  @Transform(({ value }) => value.map((id) => parseInt(id)))
  images: Image['id'][];
}
