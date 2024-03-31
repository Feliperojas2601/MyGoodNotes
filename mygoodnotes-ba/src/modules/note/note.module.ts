import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import { NoteController } from './controller/note/note.controller';
import { NoteService } from './services/note/note.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}