import { Test, TestingModule } from '@nestjs/testing';
import { TestHelper } from 'src/helpers/test.helpers';
import { UserBookController } from './user-book.controller';
import { UserBookService } from './user-book.service';

describe('UserBookController', () => {
  let controller: UserBookController;

  const serviceMock = TestHelper.getResourceMockObject();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBookController],
      providers: [{ provide: UserBookService, useValue: serviceMock }],
    }).compile();

    controller = module.get<UserBookController>(UserBookController);

    TestHelper.resetMockObject(serviceMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create book', async () => {
      const userBook = TestHelper.makeUserBook();

      serviceMock.create.mockResolvedValue(userBook);

      await expect(controller.create(userBook)).resolves.toBe(userBook);

      expect(serviceMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return userBooks array', async () => {
      const userBooks = [TestHelper.makeUserBook(), TestHelper.makeUserBook()];

      serviceMock.findAll.mockResolvedValue(userBooks);

      await expect(controller.findAll()).resolves.toBe(userBooks);

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return userBook', async () => {
      const userBook = TestHelper.makeUserBook();

      serviceMock.findOne.mockResolvedValue(userBook);

      await expect(controller.findOne(String(userBook.id))).resolves.toBe(
        userBook,
      );

      expect(serviceMock.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update book', async () => {
      const userBook = TestHelper.makeUserBook();

      serviceMock.update.mockResolvedValue(userBook);

      await expect(
        controller.update(String(userBook.id), userBook),
      ).resolves.toBe(userBook);

      expect(serviceMock.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove book', async () => {
      const userBook = TestHelper.makeUserBook();

      serviceMock.remove.mockResolvedValue(userBook);

      await expect(controller.remove(String(userBook.id))).resolves.toBe(
        userBook,
      );

      expect(serviceMock.remove).toHaveBeenCalledTimes(1);
    });
  });
});
