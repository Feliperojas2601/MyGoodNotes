import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '../schemas/note.schema';
import { CreateNoteDto } from '../dtos/createNote.dto';
import { UpdateNoteDto } from '../dtos/updateNote.dto';
import { ServiceResponse } from 'src/shared/interfaces/serviceResponse.interface';
import { createServiceResponse } from 'src/shared/utils/createServiceResponse';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<ServiceResponse<Note>> {
    try {
      const createdNote = new this.noteModel(createNoteDto);
      const createResponse = await createdNote.save();
      return createServiceResponse(createResponse, 'Note created', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async findAll(): Promise<ServiceResponse<Note[]>> {
    try {
      const notes = await this.noteModel.find().exec();
      return createServiceResponse(notes, 'Notes found', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async findOne(id: string): Promise<ServiceResponse<Note>> {
    try {
      const note = await this.noteModel.findById(id).exec();
      if (!note) {
        return createServiceResponse(
          null,
          `Note with id ${id} not found`,
          false,
        );
      }
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<ServiceResponse<Note>> {
    try {
      const updatedNote = await this.noteModel
        .findByIdAndUpdate(id, updateNoteDto, { new: true })
        .exec();
      if (!updatedNote) {
        return createServiceResponse(
          null,
          `Note with id ${id} not found`,
          false,
        );
      }
      return createServiceResponse(updatedNote, 'Note updated', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }

  async remove(id: string): Promise<ServiceResponse<void>> {
    try {
      const deletedNote = await this.noteModel.findByIdAndDelete(id).exec();
      if (!deletedNote) {
        return createServiceResponse(
          null,
          `Note with id ${id} not found`,
          false,
        );
      }
      return createServiceResponse(null, 'Note deleted', true);
    } catch (error) {
      return createServiceResponse(null, error.message, false);
    }
  }
}
