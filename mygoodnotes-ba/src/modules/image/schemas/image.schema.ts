import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  binaryData: Buffer;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
