import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly bookId: string;
}
