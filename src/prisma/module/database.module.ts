import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database.service';

@Global() //global module
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //export this service to use in other modules
})
export class PrismaModule {}
