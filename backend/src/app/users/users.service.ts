import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { books: true },
    });
  }

  async findOne(id: number) {
    await this.checkIfExists(id);

    return this.prisma.user.findUnique({
      where: { id },
      include: { books: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.checkIfExists(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.checkIfExists(id);

    return this.prisma.user.delete({ where: { id } });
  }

  private async checkIfExists(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
