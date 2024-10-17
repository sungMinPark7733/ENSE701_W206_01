import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ArticlesService } from './article.service';
import { CreateArticleDto } from './submit-article.dto';
import { Article } from './article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('test')
  test(): string {
    return this.articlesService.test();
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get('search')
  async searchArticles(
    @Query('title') title: string,
    @Query('sePractice') sePractice: string,
    @Query('publicationYear') publicationYear: string,
  ): Promise<Article[]> {
    return this.articlesService.searchArticles(
      title,
      sePractice,
      publicationYear,
    );
  }
  
  @Put(':id/verify')
  async verifyArticle(@Param('id') id: string): Promise<Article> {
    try {
      return await this.articlesService.verifyArticle(id);
    } catch (error) {
      throw new HttpException(
        'Error verifying article',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/deny')
  async denyArticle(@Param('id') id: string): Promise<void> {
    try {
      await this.articlesService.delete(id); // Use the existing delete method
    } catch (error) {
      throw new HttpException(
        'Error denying article',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  // Combined create and update functionality using CreateArticleDto
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: CreateArticleDto, // Still using CreateArticleDto for updates
  ): Promise<Article> {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article> {
    return this.articlesService.delete(id);
  }

  @Get('status/unmoderated')
  async findUnmoderatedArticles(): Promise<Article[]> {
    return this.articlesService.findByStatus('Unmoderated');
  }

  @Patch(':id/rate')
  async rateArticle(
    @Param('id') id: string,
    @Body('rating') rating: number,
  ): Promise<Article> {
    return this.articlesService.addRating(id, rating);
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateArticleDto>, // Allowing partial updates
  ): Promise<Article> {
    return this.articlesService.updateArticle(id, updateDto);
  }

  @Get('status/moderated')
  async findModeratedArticles(): Promise<Article[]> {
    return this.articlesService.findByStatus('Moderated');
  }

  @Get('count/:status')
  async count(@Param('status') selected_status: string): Promise<number> {
    return this.articlesService.count(selected_status);
  }
}
