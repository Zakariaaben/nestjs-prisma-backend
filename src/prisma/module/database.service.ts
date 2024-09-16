import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    Logger.log(
      'Trying to Connect to SQL DataBase with Prisma...',
      'PrismaService',
    );
    await this.$connect()
      .then(() =>
        Logger.log('Prisma DB connected Successfully', 'PrismaService'),
      )
      .catch((e) => {
        Logger.error(e);
        process.exit(1);
      });
  }
}
