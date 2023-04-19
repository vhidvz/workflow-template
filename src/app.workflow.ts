import { Act, Data, Node, Process, Value } from '@vhidvz/wfjs/common';
import {
  EventActivity,
  GatewayActivity,
  TaskActivity,
} from '@vhidvz/wfjs/core';
import { Data as DataFlow, Value as ValueFlow } from './schemas';
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
    activity.takeOutgoing();
  }

  @Node({ name: 'approval_gateway', pause: true })
  async approvalGateway(
    @Data() data: DataFlow,
    @Value() value: ValueFlow,
    @Act() activity: GatewayActivity,
  ) {
    data.global = `${data.global}, ${await this.appProvider.getHello(
      value.local,
    )}`;

    if (value.local !== 'no')
      activity.takeOutgoing({ name: 'parallel_gateway' });
    else activity.takeOutgoing({ name: 'some_task' }, { pause: true });
  }

  @Node({ name: 'some_task' })
  async someTask(@Value() value: ValueFlow, @Act() activity: TaskActivity) {
    activity.takeOutgoing();

    return { local: `some value(${value.local}) to end event.` };
  }

  @Node({ name: 'parallel_gateway' })
  async parallelGateway(@Act() activity: GatewayActivity) {
    activity.takeOutgoing(null, { pause: 'another_task' });
  }

  @Node({ name: 'another_task' })
  async anotherTask(@Act() activity: TaskActivity) {
    activity.takeOutgoing();
  }

  @Node({ name: 'review', pause: true })
  async review(@Value() value: ValueFlow, @Act() activity: TaskActivity) {
    activity.takeOutgoing();

    return { local: `${value.local} to end event.` };
  }

  @Node({ name: 'end' })
  async end(@Data() data: DataFlow, @Value() value: ValueFlow) {
    // Interested what happened if: throw new HttpException('TA DA...', 402);
    data.global = `${data.global}, received a value from previous task(${value.local})`;
  }
}
