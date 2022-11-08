import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestHelper } from 'src/helpers/test.helpers';

describe('UsersController', () => {
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

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it(`/users/:id (GET)`, async () => {
    const user = await prisma.user.create({ data: TestHelper.makeUser() });

    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body.id).toBe(user.id);
  });

  it(`/users (POST)`, async () => {
    const user = TestHelper.makeUser();

    const response = await request(app.getHttpServer())
      .post(`/users`)
      .send(user)
      .expect(201);

    expect(response.body).toBeTruthy();

    expect(response.body).toHaveProperty('id');

    expect(response.body.name).toBe(user.name);

    expect(response.body.email).toBe(user.email);
  });

  it(`/users/:id (PATCH)`, async () => {
    const user = await prisma.user.create({ data: TestHelper.makeUser() });

    const response = await request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send({ name: 'Jane Austen' })
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body).toHaveProperty('id');

    expect(response.body.name).toBe('Jane Austen');
  });

  it(`/users/:id (DELETE)`, async () => {
    const user = await prisma.user.create({ data: TestHelper.makeUser() });

    const response = await request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body).toHaveProperty('id');
  });
});
