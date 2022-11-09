import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { TestHelper } from 'src/helpers/test.helpers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const serviceMock = { login: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: serviceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    TestHelper.resetMockObject(serviceMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const token = faker.random.alphaNumeric();

      const user = TestHelper.makeUser();

      serviceMock.login.mockResolvedValue({ token });

      expect(controller.login({ user })).resolves.toMatchObject({ token });

      expect(serviceMock.login).toBeCalledTimes(1);
    });
  });
});
