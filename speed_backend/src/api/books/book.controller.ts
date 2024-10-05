import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Patch
  } from '@nestjs/common';
  import { BookService } from './book.service';
  import { CreateBookDto } from './create-book.dto';
  import { error } from 'console';
  
  @Controller('api/books')
  export class BookController {
    constructor(private readonly bookService: BookService) {}
  
    @Get('/test')
    test() {
      return this.bookService.test();
    }
  
    // Get all books
    @Get('/')
    async findAll() {
      try {
        return this.bookService.findAll();
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No Books found',
          },
          HttpStatus.NOT_FOUND,
          { cause: error },
        );
      }
    }
  
    // Get one book via id
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      try {
        return this.bookService.findOne(id);
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No Book found',
          },
          HttpStatus.NOT_FOUND,
          { cause: error },
        );
      }
    }
  
    // Create/add a book
    @Post('/')
    async addBook(@Body() createBookDto: CreateBookDto) {
      try {
        await this.bookService.create(createBookDto);
        return { message: 'Book added successfully' };
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unable to add this book',
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      }
    }
  
    // Update a book
    @Put('/:id')
    async updateBook(
      @Param('id') id: string,
      @Body() createBookDto: CreateBookDto,
    ) {
      try {
        await this.bookService.update(id, createBookDto);
        return { message: 'Book updated successfully' };
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unable to update this book',
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      }
    }
  
    // Delete a book via id
    @Delete('/:id')
    async deleteBook(@Param('id') id: string) {
      try {
        return await this.bookService.delete(id);
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No such a book',
          },
          HttpStatus.NOT_FOUND,
          { cause: error },
        );
      }
    }

  // Approve an article
  @Patch(':id/approve')
  async approveArticle(@Param('id') id: string){
    const article = await this.bookService.approveArticle(id);
    if(!article){
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }

  // Reject an article 
  @Patch(':id/reject')
  async rejectArticle(@Param('id') id: string) {
    const article = await this.bookService.rejectArticle(id);
    if(!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }
}