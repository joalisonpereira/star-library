import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordHelper } from 'src/helpers/password.helpers';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (
        params.model === 'User' &&
        (params.action === 'create' || params.action === 'update')
      ) {
        const { password } = params.args.data;

        if (password) {
          params.args.data.password = PasswordHelper.hash(password);
        }
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
