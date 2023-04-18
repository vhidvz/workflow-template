import { IsNotEmpty, IsString } from 'class-validator';

export class ValueDto {
  @IsString()
  @IsNotEmpty()
  local: string;
}
