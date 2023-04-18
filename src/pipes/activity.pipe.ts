import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ACTIVITY_LIST } from 'src/app.constants';

@Injectable()
export class ActivityPipe implements PipeTransform {
  transform(value: string): string {
    if (!ACTIVITY_LIST.includes(value)) {
      throw new BadRequestException('Invalid Activity');
    }

    return value;
  }
}
