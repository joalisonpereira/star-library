import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestHelper } from 'src/helpers/test.helpers';

describe('UserBookController', () => {
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

  it('/user-books (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/user-books')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it(`/user-books/:id (GET)`, async () => {
    const userBook = await createUserBook();

    const response = await request(app.getHttpServer())
      .get(`/user-books/${userBook.id}`)
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body.id).toBe(userBook.id);
  });

  it(`/user-books (POST)`, async () => {
    const userBook = await createUserBook();

    delete userBook.id;

    const response = await request(app.getHttpServer())
      .post(`/user-books`)
      .send(userBook)
      .expect(201);

    expect(response.body).toBeTruthy();

    expect(response.body).toHaveProperty('id');
  });

  it(`/user-books/:id (PATCH)`, async () => {
    const userBook = await createUserBook();

    const response = await request(app.getHttpServer())
      .patch(`/user-books/${userBook.id}`)
      .send({ rate: 10 })
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body).toHaveProperty('id');

    expect(response.body.rate).toBe(10);
  });

  it(`/user-books/:id (DELETE)`, async () => {
    const userBook = await createUserBook();

    await request(app.getHttpServer())
      .delete(`/user-books/${userBook.id}`)
      .expect(204);
  });

  async function createUserBook() {
    const book = await prisma.book.create({
      data: TestHelper.makeBook(),
    });

    const user = await prisma.user.create({
      data: TestHelper.makeUser(),
    });

    const userBook = await prisma.userBook.create({
      data: {
        ...TestHelper.makeUserBook(),
        bookId: book.id,
        userId: user.id,
      },
    });

    return userBook;
  }
});
