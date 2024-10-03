import { Module } from '@nestjs/common';
import { BookController } from './articles.controller';
import { BookService } from './articles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './articles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}