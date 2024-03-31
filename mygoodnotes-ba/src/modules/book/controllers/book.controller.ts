import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dtos/createBook.dto';
import { UpdateBookDto } from '../dtos/updateBook.dto';
import { createControllerResponse } from 'src/shared/utils/createControllerResponse';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const serviceReponse = await this.bookService.create(createBookDto);
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

  @Get()
  async findAll() {
    const serviceReponse = await this.bookService.findAll();
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
    const serviceReponse = await this.bookService.findOne(id);
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const serviceResponse = await this.bookService.update(id, updateBookDto);
    if (!serviceResponse.success) {
      return createControllerResponse(
        null,
        400,
        serviceResponse.message,
        false,
      );
    }
    return createControllerResponse(
      serviceResponse.data,
      200,
      serviceResponse.message,
      true,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const serviceResponse = await this.bookService.remove(id);
    if (!serviceResponse.success) {
      return createControllerResponse(
        null,
        400,
        serviceResponse.message,
        false,
      );
    }
    return createControllerResponse(
      serviceResponse.data,
      200,
      serviceResponse.message,
      true,
    );
  }
}
