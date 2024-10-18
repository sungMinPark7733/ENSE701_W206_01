import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
import { CreateArticleDto } from './submit-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  test(): string {
    return 'article route testing';
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleModel.create(createArticleDto);
  }

  async addRating(id: string, newRating: number): Promise<Article> {
    console.log(`Finding article with id: ${id}`);
    const article = await this.articleModel.findById(id);
    if (!article) {
      console.error('Article not found');
      throw new NotFoundException('Article not found');
    }
    console.log(`Adding new rating: ${newRating}`);
    console.log(`Current ratings before adding: ${article.rating}`);
    article.rating.push(newRating);
    await article.save();
    console.log(`Saved article with new ratings: ${article.rating}`);
    return article;
  }

  // async verifyArticle(id: string): Promise<Article> {
  //   const article = await this.articleModel.findById(id);
  //   if (!article) {
  //     throw new NotFoundException('Article not found');
  //   }
  //   article.status = 'Moderated'; // Update the status to 'Moderated'
  //   await article.save();
  //   return article;
  // }

  // async verifyArticle(id: string): Promise<Article> {
  //   console.log(`Looking for article with id: ${id}`); // Log the article ID
  //   const article = await this.articleModel.findById(id);
  
  //   if (!article) {
  //     console.error('Article with id ${id} not found'); // Log the case where the article is not found
  //     throw new NotFoundException('Article not found');
  //   }
  
  //   console.log(`Article found: ${article}`); // Log the found article
  
  //   article.status = 'Moderated'; // Update the status to 'Moderated'
  
  //   try {
  //     await article.save(); // Try to save the article
  //     console.log(`Article status updated to 'Moderated'`); // Log success after saving
  //   } catch (error) {
  //     console.error('Error saving article:', error); // Log the error
  //     throw new Error('Failed to save the article'); // Throw a more specific error
  //   }
  
  //   return article;
  // }

  async approveArticle(id: string): Promise<Article> {
    console.log(`Looking for article with id: ${id}`);
    const article = await this.articleModel.findById(id);
  
    if (!article) {
      console.error(`Article with id ${id} not found`);
      throw new NotFoundException('Article not found');
    }
  
    console.log(`Article found: ${article}`);
  
    // Add default values if required fields are missing
    article.journalConferenceName = article.journalConferenceName || 'Unknown Conference';
    article.sePractice = article.sePractice || 'General Practice';
    article.evidenceResult = article.evidenceResult || 'No Evidence';
    article.researchType = article.researchType || 'Unknown Research';
    article.participantType = article.participantType || 'Unknown Participant';
  
    article.status = 'Moderated'; // Update the status to "Moderated"
  
    try {
      await article.save();
      console.log(`Article status updated to 'Moderated'`);
    } catch (error) {
      console.error('Error saving article:', error);
      throw new Error('Failed to save the article');
    }
  
    return article;
  }

  async update(
    id: string,
    updateDto: Partial<CreateArticleDto>, // Allow partial updates
  ): Promise<Article> {
    const updatedArticle = await this.articleModel
      .findByIdAndUpdate(
        id,
        { $set: updateDto }, // Only update fields that are provided
        { new: true, runValidators: true }, // Return the updated document and run validators
      )
      .exec();

    if (!updatedArticle) {
      throw new NotFoundException('Article not found');
    }

    return updatedArticle;
  }

  async delete(id: string): Promise<Article> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
    if (!deletedArticle) {
      throw new NotFoundException('Article not found');
    }
    return deletedArticle;
  }

  async searchArticles(
    title: string,
    sePractice: string,
    publicationYear: string,
  ): Promise<Article[]> {
    const query: any = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (sePractice) {
      query.sePractice = { $regex: sePractice, $options: 'i' };
    }

    if (publicationYear) {
      query.publicationYear = { $regex: publicationYear, $options: 'i' };
    }

    return this.articleModel.find(query).exec();
  }

  async findByStatus(statusToSearch: string): Promise<Article[]> {
    return this.articleModel.find({ status: statusToSearch }).exec();
  }

  async count(selectedStatus: string): Promise<number> {
    const filter = { status: { $eq: selectedStatus } };
    return this.articleModel.countDocuments(filter).exec();
  }

  async updateArticle(
    id: string,
    updateDto: Partial<CreateArticleDto>,
  ): Promise<Article> {
    const updatedArticle = await this.articleModel
      .findByIdAndUpdate(
        id,
        { $set: updateDto }, // Update only provided fields
        { new: true, runValidators: true }, // Return updated document
      )
      .exec();

    if (!updatedArticle) {
      throw new NotFoundException('Article not found');
    }

    return updatedArticle;
  }
}
