import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContextInterface } from '@vhidvz/wfjs';
import { HydratedDocument } from 'mongoose';
import { Token } from './token.schema';
import { Status } from 'src/enums';

@Schema()
export class App implements ContextInterface {
  @Prop({ type: String, required: true, index: true })
  data: string;

  @Prop({ type: String, enum: Status, required: true })
  status: Status;

  @Prop({ type: [Object], schema: Token, required: true })
  tokens: Token[];
}

export type AppDocument = HydratedDocument<App>;
export const AppSchema = SchemaFactory.createForClass(App);
