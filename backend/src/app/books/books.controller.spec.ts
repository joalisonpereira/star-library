import { Test, TestingModule } from '@nestjs/testing';
import { TestUtils } from 'src/helpers/TestUtils';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  let service: BooksService;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [{ provide: BooksService, useValue: serviceMock }],
    }).compile();

    controller = module.get<BooksController>(BooksController);

    service = module.get<BooksService>(BooksService);

    TestUtils.resetMockObject(serviceMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();

    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create book', async () => {
      const book = TestUtils.makeBook();

      serviceMock.create.mockResolvedValue(book);

      await expect(controller.create(book)).resolves.toBe(book);

      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return books array', async () => {
      const books = [TestUtils.makeBook(), TestUtils.makeBook()];

      serviceMock.findAll.mockResolvedValue(books);

      await expect(controller.findAll()).resolves.toBe(books);

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return book', async () => {
      const book = TestUtils.makeBook();

      serviceMock.findOne.mockResolvedValue(book);

      await expect(controller.findOne(String(book.id))).resolves.toBe(book);

      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update book', async () => {
      const book = TestUtils.makeBook();

      serviceMock.update.mockResolvedValue(book);

      await expect(controller.update(String(book.id), book)).resolves.toBe(
        book,
      );

      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove book', async () => {
      const book = TestUtils.makeBook();

      serviceMock.remove.mockResolvedValue(book);

      await expect(controller.remove(String(book.id))).resolves.toBe(book);

      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
