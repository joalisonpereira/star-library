import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestHelper } from 'src/helpers/test.helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const prismaMock = {
    user: {
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
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    TestHelper.resetMockObject(prismaMock.user);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be list all users', async () => {
      const users = [TestHelper.makeUser(), TestHelper.makeUser()];

      prismaMock.user.findMany.mockResolvedValue(users);

      await expect(service.findAll()).resolves.toBe(users);

      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should be return an user', async () => {
      const user = TestHelper.makeUser();

      prismaMock.user.findUnique.mockResolvedValue(user);

      await expect(service.findOne(user.id)).resolves.toBe(user);

      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(2);
    });

    it('should be return an error when not find the user', async () => {
      const user = TestHelper.makeUser();

      prismaMock.user.findUnique.mockResolvedValue(null);

      expect(service.findOne(user.id)).rejects.toThrowError(NotFoundException);

      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create user', async () => {
      const user = TestHelper.makeUser();

      prismaMock.user.create.mockResolvedValue(user);

      await expect(service.create(user)).resolves.toMatchObject(user);

      expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const user = TestHelper.makeUser();

      prismaMock.user.findUnique.mockResolvedValue(user);

      prismaMock.user.update.mockResolvedValue(user);

      await expect(service.update(user.id, user)).resolves.toBe(user);

      expect(prismaMock.user.update).toHaveBeenCalledTimes(1);
    });

    it('should be return an error when not update the user', async () => {
      const user = TestHelper.makeUser();

      prismaMock.user.findUnique.mockResolvedValue(null);

      expect(service.update(user.id, user)).rejects.toThrowError(
        NotFoundException,
      );

      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    const user = TestHelper.makeUser();

    it('should delete user', async () => {
      prismaMock.user.findUnique.mockReturnValue(user);

      prismaMock.user.delete.mockReturnValue(user);

      await expect(service.remove(user.id)).resolves.toBe(user);

      expect(prismaMock.user.delete).toHaveBeenCalledTimes(1);
    });

    it('should be return an error when not delete the user', async () => {
      const user = TestHelper.makeUser();

      prismaMock.user.findUnique.mockResolvedValue(null);

      expect(service.remove(user.id)).rejects.toThrowError(NotFoundException);

      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
    });
  });
});
