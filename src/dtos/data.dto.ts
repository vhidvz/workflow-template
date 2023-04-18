import { IsNotEmpty, IsString } from 'class-validator';

export class DataDto {
  @IsString()
  @IsNotEmpty()
  global: string;
}
