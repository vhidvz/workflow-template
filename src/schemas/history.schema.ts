import { Prop, Schema } from '@nestjs/mongoose';
import { Status } from 'src/enums';

@Schema()
export class History {
  @Prop({ type: String })
  ref: string;

  @Prop({ type: String })
  name?: string;

  @Prop({ type: String, enum: Status })
  status: Status;

  @Prop({ type: String })
  value?: string;
}
