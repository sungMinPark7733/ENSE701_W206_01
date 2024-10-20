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

  @Prop({ required: false }) // Make this optional
  journalConferenceName?: string;

  @Prop({ required: false }) // Make this optional
  sePractice?: string;

  @Prop({ required: false }) // Make this optional
  evidenceResult?: string;

  @Prop({ required: false }) // Make this optional
  researchType?: string;

  @Prop({ required: false }) // Make this optional
  participantType?: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
