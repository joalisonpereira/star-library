import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestUtils } from 'src/helpers/TestUtils';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserBookService } from './user-book.service';

describe('UserBookService', () => {
  let service: UserBookService;

  const prismaMock = {
    userBook: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBookService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UserBookService>(UserBookService);

    TestUtils.resetMockObject(prismaMock.userBook);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be list all userBooks', async () => {
      const userBooks = [TestUtils.makeUserBook(), TestUtils.makeUserBook()];

      prismaMock.userBook.findMany.mockResolvedValue(userBooks);

      await expect(service.findAll()).resolves.toBe(userBooks);

      expect(prismaMock.userBook.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be return an book', async () => {
      const userBook = TestUtils.makeUserBook();

      prismaMock.userBook.findUnique.mockResolvedValue(userBook);

      await expect(service.findOne(userBook.id)).resolves.toBe(userBook);

      expect(prismaMock.userBook.findUnique).toHaveBeenCalledTimes(2);
    });

    it('should be return an error when not find the book', async () => {
      const userBook = TestUtils.makeUserBook();

      prismaMock.userBook.findUnique.mockResolvedValue(null);

      expect(service.findOne(userBook.id)).rejects.toThrowError(
        NotFoundException,
      );

      expect(prismaMock.userBook.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create book', async () => {
      const userBooks = TestUtils.makeUserBook();

      prismaMock.userBook.create.mockResolvedValue(userBooks);

      await expect(service.create(userBooks)).resolves.toMatchObject(userBooks);

      expect(prismaMock.userBook.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update book', async () => {
      const userBook = TestUtils.makeUserBook();

      prismaMock.userBook.findUnique.mockResolvedValue(userBook);

      prismaMock.userBook.update.mockResolvedValue(userBook);

      await expect(service.update(userBook.id, userBook)).resolves.toBe(
        userBook,
      );

      expect(prismaMock.userBook.update).toHaveBeenCalledTimes(1);
    });

    it('should be return an error when not update the book', async () => {
      const userBook = TestUtils.makeUserBook();

      prismaMock.userBook.findUnique.mockResolvedValue(null);

      expect(service.update(userBook.id, userBook)).rejects.toThrowError(
        NotFoundException,
      );

      expect(prismaMock.userBook.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    const userBook = TestUtils.makeUserBook();

    it('should delete book', async () => {
      prismaMock.userBook.findUnique.mockReturnValue(userBook);

      prismaMock.userBook.delete.mockReturnValue(userBook);

      await expect(service.remove(userBook.id)).resolves.toBe(userBook);

      expect(prismaMock.userBook.delete).toHaveBeenCalledTimes(1);
    });

    it('should be return an error when not delete the book', async () => {
      const userBook = TestUtils.makeUserBook();

      prismaMock.userBook.findUnique.mockResolvedValue(null);

      expect(service.remove(userBook.id)).rejects.toThrowError(
        NotFoundException,
      );

      expect(prismaMock.userBook.findUnique).toHaveBeenCalledTimes(1);
    });
  });
});
