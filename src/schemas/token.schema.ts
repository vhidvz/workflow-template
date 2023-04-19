import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { History, HistorySchema } from './history.schema';

@Schema({ _id: false })
export class Token {
  @ApiProperty()
  @Prop({ type: String })
  id: string;

  @ApiProperty()
  @Prop({ type: String })
  parent?: string;

  @ApiProperty()
  @Prop({ type: Boolean })
  locked?: boolean;

  @ApiProperty({ type: [History] })
  @Prop({ type: [HistorySchema] })
  histories: History[];
}

export const TokenSchema = SchemaFactory.createForClass(Token);
