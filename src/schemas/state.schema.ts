import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { StateInterface } from '@vhidvz/wfjs';
import { Value } from './value.schema';
import { Status } from 'src/enums';

@Schema({ _id: false })
export class State implements StateInterface {
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

export const StateSchema = SchemaFactory.createForClass(State);
