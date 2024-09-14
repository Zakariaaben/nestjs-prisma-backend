import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/database.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    FilesModule,
    CategoryModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
