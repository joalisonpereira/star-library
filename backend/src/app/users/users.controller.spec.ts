import { Test, TestingModule } from '@nestjs/testing';
import { TestUtils } from 'src/helpers/TestUtils';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  let service: UsersService;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: serviceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    service = module.get<UsersService>(UsersService);

    TestUtils.resetMockObject(serviceMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();

    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create user', async () => {
      const user = TestUtils.makeUser();

      serviceMock.create.mockResolvedValue(user);

      await expect(controller.create(user)).resolves.toBe(user);

      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return users array', async () => {
      const users = [TestUtils.makeUser(), TestUtils.makeUser()];

      serviceMock.findAll.mockResolvedValue(users);

      await expect(controller.findAll()).resolves.toBe(users);

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return user', async () => {
      const user = TestUtils.makeUser();

      serviceMock.findOne.mockResolvedValue(user);

      await expect(controller.findOne(String(user.id))).resolves.toBe(user);

      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const user = TestUtils.makeUser();

      serviceMock.update.mockResolvedValue(user);

      await expect(controller.update(String(user.id), user)).resolves.toBe(
        user,
      );

      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      const user = TestUtils.makeUser();

      serviceMock.remove.mockResolvedValue(user);

      await expect(controller.remove(String(user.id))).resolves.toBe(user);

      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
