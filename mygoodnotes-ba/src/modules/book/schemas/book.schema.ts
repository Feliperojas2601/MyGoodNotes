import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
