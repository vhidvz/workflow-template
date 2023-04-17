import { Injectable } from '@nestjs/common';
import { Process } from '@vhidvz/wfjs/common';

@Injectable()
@Process({ name: 'Vehicle Request', path: 'flows/app.bpmn' })
export class AppWorkflow {
  getHello(): string {
    return 'Hello World!';
  }
}
