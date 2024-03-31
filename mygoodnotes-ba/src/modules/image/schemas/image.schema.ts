import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  binaryData: Buffer;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
