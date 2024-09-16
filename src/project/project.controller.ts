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
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Prisma } from '@prisma/client';

import { createProjectDto } from './dtos/createProject.dto';
import { UpdateProjectDto } from './dtos/updateProject.dto';
import { slugify } from 'src/common/utils/slugify';
import { ProjectQueryDto } from './dtos/project-query.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAllCategories(
    @Query(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    query: PaginationDto,
  ) {
    return this.projectService.findAllProjects(query);
  }

  @Get('/:id')
  async findOneProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne({
      where: {
        id,
      },
    });
  }

  @Post()
  async createProject(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    projectCreateInput: createProjectDto,
  ) {
    if (!projectCreateInput.slug) {
      projectCreateInput.slug = slugify(projectCreateInput.name);
    } else {
      projectCreateInput.slug = slugify(projectCreateInput.slug);
    }

    return this.projectService.createProject({
      ...projectCreateInput,
      images: {
        connect: projectCreateInput.images.map((id) => ({ id })),
      },
    } as Prisma.ProjectCreateInput);
  }

  @Patch('/:id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    projectUpdateInput: UpdateProjectDto,
  ) {
    if (projectUpdateInput.slug)
      projectUpdateInput.slug = slugify(projectUpdateInput.slug);
    return this.projectService.updateProject(id, {
      ...projectUpdateInput,
      images: { connect: projectUpdateInput.images?.map((id) => ({ id })) },
    });
  }

  @Delete('/:id')
  async deleteProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProjectById(id);
  }
}
