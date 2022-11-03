import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({ data: createBookDto });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    await this.checkIfExists(id);

    return this.prisma.book.findUnique({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.checkIfExists(id);

    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  async remove(id: number) {
    await this.checkIfExists(id);

    return this.prisma.book.delete({ where: { id } });
  }

  private async checkIfExists(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
  }
}
