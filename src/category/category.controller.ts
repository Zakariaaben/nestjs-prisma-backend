import { Prisma } from '@prisma/client';
import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
const slug = require('slug');

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(@Query() query: Prisma.CategoryFindManyArgs) {
    return this.categoryService.findAllCategories(query);
  }

  @Get('/:id')
  async findOneCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne({
      where: {
        id,
      },
    });
  }

  @Post()
  async createCategory(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    categoryCreateInput: createCategoryDto,
  ) {
    if (!categoryCreateInput.slug) {
      categoryCreateInput.slug = slug(categoryCreateInput.name);
    } else {
      categoryCreateInput.slug = slug(categoryCreateInput.slug);
    }
    return this.categoryService.createCategory(
      categoryCreateInput as Prisma.CategoryCreateInput,
    );
  }

  @Patch('/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    categoryUpdateInput: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, categoryUpdateInput);
  }

  @Delete('/:id')
  async deleteCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategoryById(id);
  }
}
