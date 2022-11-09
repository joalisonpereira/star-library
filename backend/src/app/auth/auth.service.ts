import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PasswordHelper } from 'src/helpers/password.helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: Prisma.UserCreateManyInput) {
    const payload = { sub: user.id, email: user.email };

    return { token: this.jwtService.sign(payload) };
  }

  async validate(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const passwordIsValid = PasswordHelper.compare(password, user.password);

    if (!passwordIsValid) return null;

    return user;
  }
}
