import { Test, TestingModule } from '@nestjs/testing';
import { TestHelper } from 'src/helpers/test.helpers';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  const serviceMock = TestHelper.getResourceMockObject();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [{ provide: BooksService, useValue: serviceMock }],
    }).compile();

    controller = module.get<BooksController>(BooksController);

    TestHelper.resetMockObject(serviceMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create book', async () => {
      const book = TestHelper.makeBook();

      serviceMock.create.mockResolvedValue(book);

      await expect(controller.create(book)).resolves.toBe(book);

      expect(serviceMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return books array', async () => {
      const books = [TestHelper.makeBook(), TestHelper.makeBook()];

      serviceMock.findAll.mockResolvedValue(books);

      await expect(controller.findAll()).resolves.toBe(books);

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return book', async () => {
      const book = TestHelper.makeBook();

      serviceMock.findOne.mockResolvedValue(book);

      await expect(controller.findOne(String(book.id))).resolves.toBe(book);

      expect(serviceMock.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update book', async () => {
      const book = TestHelper.makeBook();

      serviceMock.update.mockResolvedValue(book);

      await expect(controller.update(String(book.id), book)).resolves.toBe(
        book,
      );

      expect(serviceMock.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove book', async () => {
      const book = TestHelper.makeBook();

      serviceMock.remove.mockResolvedValue(book);

      await expect(controller.remove(String(book.id))).resolves.toBe(book);

      expect(serviceMock.remove).toHaveBeenCalledTimes(1);
    });
  });
});
