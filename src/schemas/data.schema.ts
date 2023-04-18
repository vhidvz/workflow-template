import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Data {
  @ApiProperty()
  @Prop({ type: String })
  global: string;
}
