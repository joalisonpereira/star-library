import { Test, TestingModule } from '@nestjs/testing';
import { TestHelper } from 'src/helpers/test.helpers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const serviceMock = TestHelper.getResourceMockObject();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: serviceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    TestHelper.resetMockObject(serviceMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create user', async () => {
      const user = TestHelper.makeUser();

      serviceMock.create.mockResolvedValue(user);

      await expect(controller.create(user)).resolves.toBe(user);

      expect(serviceMock.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return users array', async () => {
      const users = [TestHelper.makeUser(), TestHelper.makeUser()];

      serviceMock.findAll.mockResolvedValue(users);

      await expect(controller.findAll()).resolves.toBe(users);

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return user', async () => {
      const user = TestHelper.makeUser();

      serviceMock.findOne.mockResolvedValue(user);

      await expect(controller.findOne(String(user.id))).resolves.toBe(user);

      expect(serviceMock.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const user = TestHelper.makeUser();

      serviceMock.update.mockResolvedValue(user);

      await expect(controller.update(String(user.id), user)).resolves.toBe(
        user,
      );

      expect(serviceMock.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      const user = TestHelper.makeUser();

      serviceMock.remove.mockResolvedValue(user);

      await expect(controller.remove(String(user.id))).resolves.toBe(user);

      expect(serviceMock.remove).toHaveBeenCalledTimes(1);
    });
  });
});
