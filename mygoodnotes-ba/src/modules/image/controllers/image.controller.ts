import {
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from '../services/image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createControllerResponse } from 'src/shared/utils/createControllerResponse';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image',
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const serviceReponse = await this.imageService.create(image.buffer);
    if (!serviceReponse.success) {
      return createControllerResponse(null, 400, serviceReponse.message, false);
    }
    return createControllerResponse(
      serviceReponse.data,
      200,
      serviceReponse.message,
      true,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const serviceReponse = await this.imageService.findOne(id);
    if (!serviceReponse.success) {
      return createControllerResponse(null, 400, serviceReponse.message, false);
    }
    return createControllerResponse(
      serviceReponse.data,
      200,
      serviceReponse.message,
      true,
    );
  }
}
