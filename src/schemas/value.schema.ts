import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Value {
  @ApiProperty()
  @Prop({ type: String })
  local: string;
}
