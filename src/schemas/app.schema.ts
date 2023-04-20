import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContextInterface } from '@vhidvz/wfjs';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Token, TokenSchema } from './token.schema';
import { Status } from 'src/enums';
import { Data } from './data.schema';

@Schema()
export class App implements ContextInterface {
  @ApiProperty()
  @Prop({ type: Data, required: true, index: true })
  data: Data;

  @ApiProperty({ enum: Status })
  @Prop({ type: String, enum: Status, required: true })
  status: Status;

  @ApiProperty({ type: [Token] })
  @Prop({ type: [TokenSchema], required: true })
  tokens: Token[];
}

export type AppDocument = HydratedDocument<App>;
export const AppSchema = SchemaFactory.createForClass(App);
