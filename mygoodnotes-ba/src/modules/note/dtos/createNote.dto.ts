import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly bookId: string;
}
