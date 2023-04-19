import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class Value {
  @ApiProperty()
  @Prop({ type: String, required: true, trim: true, minlength: 1 })
  local: string;
}
