import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string;  // Multiple authors can be stored as a string or array

  @Prop({ required: true, type: Date })
  published_date: Date;

  @Prop({ required: true })
  journal_conference: string;  // Name of the journal or conference

  @Prop({ required: true })
  se_practice: string;  // SE practice related to the article

  @Prop({ required: true })
  claim: string;  // The claim discussed in the article

  @Prop({ required: true })
  evidence_result: string;  // Result of the evidence (e.g., agree, disagree)

  @Prop({ required: true })
  research_type: string;  // Type of research (e.g., case study, experiment)

  @Prop({ required: true })
  participant_type: string;  // Type of participant (e.g., Student, Practitioner)

  @Prop({ required: true })
  publisher: string;  // Publisher of the article
}

export const ArticleSchema = SchemaFactory.createForClass(Article);