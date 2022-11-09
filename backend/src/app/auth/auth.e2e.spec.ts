import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestHelper } from 'src/helpers/test.helpers';

describe('AuthController', () => {
  let app: INestApplication;

  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/auth/login (POST)`, async () => {
    const password = '1234';

    const user = await prisma.user.create({
      data: { ...TestHelper.makeUser(), password },
    });

    const response = await request(app.getHttpServer())
      .post(`/auth/login`)
      .send({ email: user.email, password })
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body.token).toBeTruthy();
  });
});
