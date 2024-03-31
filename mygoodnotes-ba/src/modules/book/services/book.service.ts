import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../schemas/book.schema';
import { CreateBookDto } from '../dtos/createBook.dto';
import { UpdateBookDto } from '../dtos/updateBook.dto';
import { ServiceResponse } from 'src/shared/interfaces/serviceResponse.interface';
import { createServiceResponse } from 'src/shared/utils/createServiceResponse';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<ServiceResponse<Book>> {
    try {
      const createdBook = new this.bookModel(createBookDto);
      const createResponse = await createdBook.save();
      return createServiceResponse(createResponse, 'Book created', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async findAll(): Promise<ServiceResponse<Book[]>> {
    try {
      const books = await this.bookModel.find().exec();
      return createServiceResponse(books, 'Books found', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async findOne(id: string): Promise<ServiceResponse<Book>> {
    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        return createServiceResponse(
          null,
          `Book with id ${id} not found`,
          false,
        );
      }
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<ServiceResponse<Book>> {
    try {
      const updatedBook = await this.bookModel
        .findByIdAndUpdate(id, updateBookDto, { new: true })
        .exec();
      if (!updatedBook) {
        return createServiceResponse(
          null,
          `Book with id ${id} not found`,
          false,
        );
      }
      return createServiceResponse(updatedBook, 'Book updated', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async remove(id: string): Promise<ServiceResponse<void>> {
    try {
      const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
      if (!deletedBook) {
        return createServiceResponse(
          null,
          `Book with id ${id} not found`,
          false,
        );
      }
      return createServiceResponse(null, 'Book deleted', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }
}
