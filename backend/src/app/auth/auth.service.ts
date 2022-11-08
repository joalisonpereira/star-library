import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

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
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) return null;

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) return null;

    return user;
  }
}
