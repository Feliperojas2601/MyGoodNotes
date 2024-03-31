import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsString()
  readonly content?: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly bookId: string;
}
