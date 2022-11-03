import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';

@Injectable()
export class UserBookService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserBookDto: CreateUserBookDto) {
    return this.prisma.userBook.create({ data: createUserBookDto });
  }

  findAll() {
    return this.prisma.userBook.findMany();
  }

  async findOne(id: number) {
    await this.checkIfExists(id);

    return this.prisma.userBook.findUnique({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateUserBookDto) {
    await this.checkIfExists(id);

    return this.prisma.userBook.update({ where: { id }, data: updateBookDto });
  }

  async remove(id: number) {
    await this.checkIfExists(id);

    return this.prisma.userBook.delete({ where: { id } });
  }

  private async checkIfExists(id: number) {
    const userBook = await this.prisma.userBook.findUnique({ where: { id } });

    if (!userBook) {
      throw new NotFoundException('UserBook not found');
    }
  }
}
