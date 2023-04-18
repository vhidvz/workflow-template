import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { History } from './history.schema';

@Schema()
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
  @Prop({ type: [Object], schema: History })
  histories: History[];
}
