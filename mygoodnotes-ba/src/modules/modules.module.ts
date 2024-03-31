import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ImageModule } from './image/image.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [BookModule, ImageModule, NoteModule],
})
export class ModulesModule {}
