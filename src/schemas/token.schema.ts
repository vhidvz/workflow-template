import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { State, StateSchema } from './state.schema';
import { ApiProperty } from '@nestjs/swagger';
import { TokenInterface } from '@vhidvz/wfjs';

@Schema({ _id: false })
export class Token implements TokenInterface {
  @ApiProperty()
  @Prop({ type: String })
  id: string;

  @ApiProperty()
  @Prop({ type: String })
  parent?: string;

  @ApiProperty()
  @Prop({ type: Boolean })
  locked?: boolean;

  @ApiProperty({ type: [State] })
  @Prop({ type: [StateSchema] })
  history: State[];
}

export const TokenSchema = SchemaFactory.createForClass(Token);
