import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from 'src/modules/book/schemas/book.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
