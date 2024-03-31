import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import { NoteController } from './controllers/note.controller';
import { NoteService } from './services/note.service';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    BookModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
