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
import { ControllerResponse } from 'src/shared/interfaces/controllerResponse.interface';
import { CreateBookDto } from '../dtos/createBook.dto';
import { UpdateBookDto } from '../dtos/updateBook.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  public createControllerResponse<T>(
    data: T,
    status: number,
    message: string,
    success: boolean,
  ): ControllerResponse<T> {
    return {
      data,
      message,
      success,
      status,
    };
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const serviceReponse = await this.bookService.create(createBookDto);
    if (!serviceReponse.success) {
      return this.createControllerResponse(
        null,
        400,
        serviceReponse.message,
        false,
      );
    }
    return this.createControllerResponse(
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
      return this.createControllerResponse(
        null,
        400,
        serviceReponse.message,
        false,
      );
    }
    return this.createControllerResponse(
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
      return this.createControllerResponse(
        null,
        400,
        serviceReponse.message,
        false,
      );
    }
    return this.createControllerResponse(
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
      return this.createControllerResponse(
        null,
        400,
        serviceResponse.message,
        false,
      );
    }
    return this.createControllerResponse(
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
      return this.createControllerResponse(
        null,
        400,
        serviceResponse.message,
        false,
      );
    }
    return this.createControllerResponse(
      serviceResponse.data,
      200,
      serviceResponse.message,
      true,
    );
  }
}
