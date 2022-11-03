import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserBookDto
  implements
    Pick<Prisma.UserBookUncheckedCreateInput, 'rate' | 'userId' | 'bookId'>
{
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;
}
