import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

export class TestUtils {
  static makeUser(): Prisma.UserCreateManyInput {
    return {
      email: faker.internet.email(),
      name: faker.name.fullName(),
      password: faker.internet.password(),
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
}
