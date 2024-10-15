import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './article.controller';
import { ArticlesService } from './article.service';
import { Article, ArticleSchema } from './article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService], // Export the service if you need to use it in other modules
})
export class ArticlesModule {}
