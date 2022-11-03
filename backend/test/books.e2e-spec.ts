import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('BooksController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

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

  it('/books/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/books/1')
      .expect(200);

    expect(response.body).toBeTruthy();

    expect(response.body).toHaveProperty('id');
  });
});
