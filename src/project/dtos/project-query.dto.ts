import {
  IsOptional,
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

// DTO for filtering conditions
class WhereInputDto {
  @IsOptional()
  @IsObject()
  // Define the structure based on your needs
  AND?: Prisma.ProjectWhereInput;

  @IsOptional()
  @IsObject()
  // Define the structure based on your needs
  OR?: Prisma.ProjectWhereInput;

  @IsOptional()
  @IsObject()
  // Define the structure based on your needs
  NOT?: Prisma.ProjectWhereInput;

  // Add more fields as needed
}

// DTO for sorting
class OrderByInputDto {
  @IsOptional()
  @IsString()
  // Define the field to sort by
  field?: string;

  @IsOptional()
  @IsString()
  // Define the sorting direction, e.g., 'asc' or 'desc'
  direction?: 'asc' | 'desc';
}

// Main DTO
export class ProjectQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  skip?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WhereInputDto)
  where?: WhereInputDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderByInputDto)
  orderBy?: OrderByInputDto[];
}
