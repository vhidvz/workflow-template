import { Act, Data, Node, Process } from '@vhidvz/wfjs/common';
import { EventActivity } from '@vhidvz/wfjs/core';
import { AppProvider } from './app.provider';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { WorkflowJS } from '@vhidvz/wfjs';

@Injectable()
@Process({ name: 'Vehicle Request', path: join(__dirname, 'app.flow.bpmn') })
export class AppWorkflow extends WorkflowJS {
  constructor(private readonly appProvider: AppProvider) {
    super();
  }

  @Node({ name: 'start' })
  async start(@Act() activity: EventActivity) {
    activity.takeOutgoing();

    return await this.appProvider.getHello();
  }
}
