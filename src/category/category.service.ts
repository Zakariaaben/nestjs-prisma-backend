import { Injectable, Logger } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/module/database.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllCategories(options: Prisma.CategoryFindManyArgs) {
    Logger.verbose(
      `Finding All Categories with options ${JSON.stringify(options)}`,
    );
    return this.prismaService.category.findMany({
      include: {
        projects: true,
      },
      ...options,
    });
  }

  // find a category by id or by name
  async findOne(options: { where: Prisma.CategoryWhereUniqueInput }) {
    Logger.verbose(`Finding category where ${JSON.stringify(options.where)}`);
    return this.prismaService.category.findUnique({
      where: options.where,
      include: {
        projects: true,
      },
    });
  }

  async createCategory(categoryCreateInput: Prisma.CategoryCreateInput) {
    Logger.verbose(`Creating category with name: ${categoryCreateInput.name}`);
    return this.prismaService.category.create({
      data: categoryCreateInput,
    });
  }

  async updateCategory(
    categoryId: Category['id'],
    categoryUpdateInput: Prisma.CategoryUpdateInput,
  ) {
    Logger.verbose(`Updating category with id: ${categoryId}`);
    return this.prismaService.category.update({
      where: { id: categoryId },
      data: categoryUpdateInput,
    });
  }

  async deleteCategoryById(categoryId: Category['id']) {
    Logger.verbose(`Deleting category with id: ${categoryId}`);
    return this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }
}
