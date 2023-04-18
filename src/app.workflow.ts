import { Act, Data, Node, Process, Value } from '@vhidvz/wfjs/common';
import {
  EventActivity,
  GatewayActivity,
  TaskActivity,
} from '@vhidvz/wfjs/core';
import { AppProvider } from './app.provider';
import { Injectable } from '@nestjs/common';
import { WorkflowJS } from '@vhidvz/wfjs';
import { join } from 'path';

@Injectable()
@Process({ name: 'Simple Workflow', path: join(__dirname, 'app.flow.bpmn') })
export class AppWorkflow extends WorkflowJS {
  constructor(private readonly appProvider: AppProvider) {
    super();
  }

  @Node({ name: 'start' })
  async start(@Act() activity: EventActivity) {
    activity.takeOutgoing(null, { pause: true });
  }

  @Node({ name: 'approval_gateway' })
  async approvalGateway(
    @Data() data: string,
    @Value() value: string,
    @Act() activity: GatewayActivity,
  ) {
    if (value !== 'no') activity.takeOutgoing({ name: 'parallel_gateway' });
    else activity.takeOutgoing({ name: 'some_task' }, { pause: true });

    data = `${data}, ${await this.appProvider.getHello(value)}`;
  }

  @Node({ name: 'some_task' })
  async someTask(@Value() value: string, @Act() activity: TaskActivity) {
    activity.takeOutgoing();

    return `some value(${value}) to end event.`;
  }

  @Node({ name: 'parallel_gateway' })
  async parallelGateway(@Act() activity: GatewayActivity) {
    activity.takeOutgoing({ name: 'do_some_work' });
    activity.takeOutgoing({ name: 'another_task' }, { pause: true });
  }

  @Node({ name: 'end' })
  async end(@Data() data: string, @Value() value: string) {
    // Interested what happened if: throw new Error('TA DA...');
    data = `${data}, received a value from previous task(${value})`;
  }
}
