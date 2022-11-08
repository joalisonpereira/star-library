import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { BooksModule } from './app/books/books.module';
import { UserBookModule } from './app/user-book/user-book.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    BooksModule,
    UserBookModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
