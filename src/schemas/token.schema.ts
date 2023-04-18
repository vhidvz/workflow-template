import { Prop, Schema } from '@nestjs/mongoose';
import { History } from './history.schema';

@Schema()
export class Token {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  parent?: string;

  @Prop({ type: Boolean })
  locked?: boolean;

  @Prop({ type: [Object], schema: History })
  histories: History[];
}
