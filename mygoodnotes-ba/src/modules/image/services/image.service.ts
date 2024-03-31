import { Injectable } from '@nestjs/common';
import { Image, ImageDocument } from '../schemas/image.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createServiceResponse } from 'src/shared/utils/createServiceResponse';
import { ServiceResponse } from 'src/shared/interfaces/serviceResponse.interface';
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  async create(buffer: Buffer): Promise<ServiceResponse<Image>> {
    try {
      const webpBuffer = await sharp(buffer).webp().toBuffer();
      const createdImage = new this.imageModel({
        binaryData: webpBuffer,
      });
      const createResponse = await createdImage.save();
      return createServiceResponse(createResponse, 'Image created', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async findOne(id: string): Promise<ServiceResponse<Image>> {
    try {
      const image = await this.imageModel.findById(id).exec();
      if (!image) {
        return createServiceResponse(
          null,
          `Image with id ${id} not found`,
          false,
        );
      }
      return createServiceResponse(image, 'Image found', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }
}
