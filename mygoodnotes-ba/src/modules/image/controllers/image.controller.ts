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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from '../dtos/fileUpload..dto';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
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
    file: Express.Multer.File,
  ) {
    const serviceReponse = await this.imageService.create(file.buffer);
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
