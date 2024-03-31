import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../schemas/book.schema';
import { CreateBookDto } from '../dtos/createBook.dto';
import { UpdateBookDto } from '../dtos/updateBook.dto';
import { ServiceResponse } from 'src/shared/interfaces/serviceResponse.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  public createServiceResponse<T>(
    data: T,
    message: string,
    success: boolean,
  ): ServiceResponse<T> {
    return {
      data,
      message,
      success,
    };
  }

  async create(createBookDto: CreateBookDto): Promise<ServiceResponse<Book>> {
    try {
      const createdBook = new this.bookModel(createBookDto);
      const createResponse = await createdBook.save();
      return this.createServiceResponse(createResponse, 'Book created', true);
    } catch (error) {
      return this.createServiceResponse(null, error.message, false);
    }
  }

  async findAll(): Promise<ServiceResponse<Book[]>> {
    try {
      const books = await this.bookModel.find().exec();
      return this.createServiceResponse(books, 'Books found', true);
    } catch (error) {
      return this.createServiceResponse(null, error.message, false);
    }
  }

  async findOne(id: string): Promise<ServiceResponse<Book>> {
    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        return this.createServiceResponse(
          null,
          `Book with id ${id} not found`,
          false,
        );
      }
    } catch (error) {
      return this.createServiceResponse(null, error.message, false);
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
        return this.createServiceResponse(
          null,
          `Book with id ${id} not found`,
          false,
        );
      }
      return this.createServiceResponse(updatedBook, 'Book updated', true);
    } catch (error) {
      return this.createServiceResponse(null, error.message, false);
    }
  }

  async remove(id: string): Promise<ServiceResponse<void>> {
    try {
      const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
      if (!deletedBook) {
        return this.createServiceResponse(
          null,
          `Book with id ${id} not found`,
          false,
        );
      }
      return this.createServiceResponse(null, 'Book deleted', true);
    } catch (error) {
      return this.createServiceResponse(null, error.message, false);
    }
  }
}
