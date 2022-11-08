import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestHelper } from 'src/helpers/test.helpers';

describe('BooksController', () => {
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

  it('/books (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it(`/books/:id (GET)`, async () => {
    const book = await prisma.book.create({ data: TestHelper.makeBook() });

    const response = await request(app.getHttpServer())
      .get(`/books/${book?.id}`)
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body.id).toBe(book.id);
  });

  it(`/books (POST)`, async () => {
    const book = TestHelper.makeBook();

    const response = await request(app.getHttpServer())
      .post(`/books`)
      .send(book)
      .expect(201);

    expect(response.body).toBeTruthy();

    expect(response.body).toHaveProperty('id');

    expect(response.body.name).toBe(book.name);

    expect(response.body.author).toBe(book.author);
  });

  it(`/books/:id (PATCH)`, async () => {
    const book = await prisma.book.create({ data: TestHelper.makeBook() });

    const response = await request(app.getHttpServer())
      .patch(`/books/${book?.id}`)
      .send({ name: 'Jane Austen' })
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body).toHaveProperty('id');

    expect(response.body.name).toBe('Jane Austen');
  });

  it(`/books/:id (DELETE)`, async () => {
    const book = await prisma.book.create({ data: TestHelper.makeBook() });

    await request(app.getHttpServer()).delete(`/books/${book?.id}`).expect(204);
  });
});
