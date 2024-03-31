import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NoteService } from '../services/note.service';
import { CreateNoteDto } from '../dtos/createNote.dto';
import { UpdateNoteDto } from '../dtos/updateNote.dto';
import { createControllerResponse } from 'src/shared/utils/createControllerResponse';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    const serviceReponse = await this.noteService.create(createNoteDto);
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
    const serviceReponse = await this.noteService.findAll();
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
    const serviceReponse = await this.noteService.findOne(id);
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
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const serviceResponse = await this.noteService.update(id, updateNoteDto);
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
    const serviceResponse = await this.noteService.remove(id);
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
