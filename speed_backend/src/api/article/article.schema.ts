import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  publicationYear: string;

  @Prop({ required: true })
  doi: string;

  @Prop({ default: 'Unmoderated' })
  status: string;

  @Prop({ type: [String], default: [] })
  claim: string[];

  @Prop({ default: [] })
  evidence: string[];

  // Change to allow ratings to be optional and to manage default values
  @Prop({ type: [Number], default: [] })
  rating: number[];

  @Prop({ required: true })
  journalConferenceName: string;

  @Prop({ required: true })
  sePractice: string;

  @Prop({ required: true })
  evidenceResult: string;

  @Prop({ required: true })
  researchType: string;

  @Prop({ required: true })
  participantType: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
