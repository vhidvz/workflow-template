import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Data {
  @ApiProperty()
  @Prop({ type: String, required: true, trim: true, minlength: 1 })
  global: string;
}
