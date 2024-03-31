import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsString()
  readonly color?: string;
}
