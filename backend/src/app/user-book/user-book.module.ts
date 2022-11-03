import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { UserBookController } from './user-book.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserBookController],
  providers: [UserBookService, PrismaService],
})
export class UserBookModule {}
