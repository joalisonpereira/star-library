import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TestHelper } from 'src/helpers/test.helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = { user: TestHelper.getPrismaMockObject() };

  const jwtMock = { sign: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtMock },
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    TestHelper.resetMockObject(prismaMock.user);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return object with jwt', async () => {
      const user = TestHelper.makeUser();

      const jwt = faker.random.alphaNumeric();

      jwtMock.sign.mockReturnValue(jwt);

      expect(service.login(user)).resolves.toMatchObject({ token: jwt });

      expect(jwtMock.sign).toBeCalledTimes(1);
    });
  });

  describe('validate', () => {
    it('should return null because have not user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      expect(service.validate('fake@email', '1234')).resolves.toBe(null);

      expect(prismaMock.user.findUnique).toBeCalledTimes(1);
    });

    it('should return null because password is invalid', async () => {
      const password = '1234';

      const user = TestHelper.makeUser({ password });

      prismaMock.user.findUnique.mockResolvedValue(user);

      expect(service.validate('fake@email', '4321')).resolves.toBe(null);

      expect(prismaMock.user.findUnique).toBeCalledTimes(1);
    });

    it('should return an user', async () => {
      const password = '1234';

      const user = TestHelper.makeUser({ password });

      prismaMock.user.findUnique.mockResolvedValue(user);

      expect(service.validate('fake@email', '1234')).resolves.toMatchObject(
        user,
      );

      expect(prismaMock.user.findUnique).toBeCalledTimes(1);
    });
  });
});
