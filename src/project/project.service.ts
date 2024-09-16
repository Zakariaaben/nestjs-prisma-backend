import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/module/database.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllProjects(options: Prisma.ProjectFindManyArgs) {
    Logger.verbose(
      `Finding All Projects with options ${JSON.stringify(options)}`,
    );
    return this.prismaService.project.findMany({
      include: {
        category: true,
        images: true,
      },

      ...options,
    });
  }

  // find a project by id or by name
  async findOne(options: { where: Prisma.ProjectWhereUniqueInput }) {
    Logger.verbose(`Finding category where ${JSON.stringify(options.where)}`);
    return this.prismaService.project.findUnique({
      where: options.where,
      include: {
        images: true,
        category: true,
      },
    });
  }

  async createProject(projectCreateInput: Prisma.ProjectCreateInput) {
    Logger.verbose(
      `Creating Project with data: ${JSON.stringify(projectCreateInput)}`,
    );
    return this.prismaService.project.create({
      data: projectCreateInput,
    });
  }

  async updateProject(
    projectId: Project['id'],
    projectUpdateInput: Prisma.ProjectUpdateInput,
  ) {
    Logger.verbose(
      `Updating project with id: ${projectId} with data: ${JSON.stringify(projectUpdateInput)}`,
    );
    return this.prismaService.project.update({
      where: { id: projectId },
      data: projectUpdateInput,
    });
  }

  async deleteProjectById(projectId: Project['id']) {
    Logger.verbose(`Deleting project with id: ${projectId}`);
    return this.prismaService.project.delete({
      where: { id: projectId },
    });
  }
}
