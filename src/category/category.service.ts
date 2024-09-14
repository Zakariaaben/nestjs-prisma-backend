import {
  BadGatewayException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { error } from 'console';
import { PrismaService } from 'src/prisma/database.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllCategories(options: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany({
      include: {
        projects: true,
      },
      ...options,
    });
  }

  // find a category by id or by name
  async findOne(options: { where: Prisma.CategoryWhereUniqueInput }) {
    return this.prismaService.category.findUnique({
      where: options.where,
      include: {
        projects: true,
      },
    });
  }

  async createCategory(categoryCreateInput: Prisma.CategoryCreateInput) {
    return this.prismaService.category.create({
      data: categoryCreateInput,
    });
  }

  async updateCategory(
    categoryId: Category['id'],
    categoryUpdateInput: Prisma.CategoryUpdateInput,
  ) {
    return this.prismaService.category.update({
      where: { id: categoryId },
      data: categoryUpdateInput,
    });
  }

  async deleteCategoryById(categoryId: Category['id']) {
    return this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }
}
