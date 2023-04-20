import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/enums';
import { Value } from './value.schema';

@Schema({ _id: false })
export class History {
  @ApiProperty()
  @Prop({ type: String })
  ref: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  name?: string;

  @ApiProperty({ enum: Status })
  @Prop({ type: String, enum: Status })
  status: Status;

  @ApiProperty()
  @Prop({ type: Value, required: false })
  value?: Value;
}

export const HistorySchema = SchemaFactory.createForClass(History);
