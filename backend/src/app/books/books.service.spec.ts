import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestHelper } from 'src/helpers/test.helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  const prismaMock = {
    book: TestHelper.getPrismaMockObject(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);

    TestHelper.resetMockObject(prismaMock.book);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be list all books', async () => {
      const books = [TestHelper.makeBook(), TestHelper.makeBook()];

      prismaMock.book.findMany.mockResolvedValue(books);

      await expect(service.findAll()).resolves.toBe(books);

      expect(prismaMock.book.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be return an book', async () => {
      const book = TestHelper.makeBook();

      prismaMock.book.findUnique.mockResolvedValue(book);

      await expect(service.findOne(book.id)).resolves.toBe(book);

      expect(prismaMock.book.findUnique).toHaveBeenCalledTimes(2);
    });

    it('should be return an error when not find the book', async () => {
      const book = TestHelper.makeBook();

      prismaMock.book.findUnique.mockResolvedValue(null);

      expect(service.findOne(book.id)).rejects.toThrowError(NotFoundException);

      expect(prismaMock.book.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create book', async () => {
      const book = TestHelper.makeBook();

      prismaMock.book.create.mockResolvedValue(book);

      await expect(service.create(book)).resolves.toMatchObject(book);

      expect(prismaMock.book.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update book', async () => {
      const book = TestHelper.makeBook();

      prismaMock.book.findUnique.mockResolvedValue(book);

      prismaMock.book.update.mockResolvedValue(book);

      await expect(service.update(book.id, book)).resolves.toBe(book);

      expect(prismaMock.book.update).toHaveBeenCalledTimes(1);
    });

    it('should be return an error when not update the book', async () => {
      const book = TestHelper.makeBook();

      prismaMock.book.findUnique.mockResolvedValue(null);

      expect(service.update(book.id, book)).rejects.toThrowError(
        NotFoundException,
      );

      expect(prismaMock.book.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    const book = TestHelper.makeBook();

    it('should delete book', async () => {
      prismaMock.book.findUnique.mockReturnValue(book);

      prismaMock.book.delete.mockReturnValue(book);

      await expect(service.remove(book.id)).resolves.toBe(book);

      expect(prismaMock.book.delete).toHaveBeenCalledTimes(1);
    });

    it('should be return an error when not delete the book', async () => {
      const book = TestHelper.makeBook();

      prismaMock.book.findUnique.mockResolvedValue(null);

      expect(service.remove(book.id)).rejects.toThrowError(NotFoundException);

      expect(prismaMock.book.findUnique).toHaveBeenCalledTimes(1);
    });
  });
});
