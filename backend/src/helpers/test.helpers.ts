import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PasswordHelper } from './password.helpers';

export class TestHelper {
  static makeUser(
    data: Partial<Prisma.UserCreateManyInput> = {},
  ): Prisma.UserCreateManyInput {
    return {
      email: faker.internet.email(),
      name: faker.name.fullName(),
      ...data,
      password: PasswordHelper.hash(data.password ?? faker.internet.password()),
    };
  }

  static makeBook(): Prisma.BookCreateManyInput {
    return {
      name: faker.name.firstName(),
      author: faker.name.fullName(),
    };
  }

  static makeUserBook(): Prisma.UserBookCreateManyInput {
    return {
      bookId: Number(faker.random.numeric()),
      userId: Number(faker.random.numeric()),
      rate: Number(faker.random.numeric()),
    };
  }

  static resetMockObject(mockObject: {
    [key: string]: ReturnType<typeof jest.fn>;
  }) {
    Object.entries(mockObject).forEach(([, fc]) => fc.mockReset());
  }

  static getPrismaMockObject() {
    return {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  }

  static getResourceMockObject() {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
  }
}
