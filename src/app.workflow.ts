import { Act, Data, Node, Process, Value } from '@vhidvz/wfjs/common';
import {
  EventActivity,
  GatewayActivity,
  TaskActivity,
} from '@vhidvz/wfjs/core';
import { AppProvider } from './app.provider';
import { Injectable } from '@nestjs/common';
import { DataDto, ValueDto } from './dtos';
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
    @Data() data: DataDto,
    @Value() value: ValueDto,
    @Act() activity: GatewayActivity,
  ) {
    if (value.local !== 'no')
      activity.takeOutgoing({ name: 'parallel_gateway' });
    else activity.takeOutgoing({ name: 'some_task' }, { pause: true });

    data.global = `${data.global}, ${await this.appProvider.getHello(
      value.local,
    )}`;
  }

  @Node({ name: 'some_task' })
  async someTask(@Value() value: ValueDto, @Act() activity: TaskActivity) {
    activity.takeOutgoing();

    return `some value(${value}) to end event.`;
  }

  @Node({ name: 'parallel_gateway' })
  async parallelGateway(@Act() activity: GatewayActivity) {
    activity.takeOutgoing({ name: 'do_some_work' });
    activity.takeOutgoing({ name: 'another_task' }, { pause: true });
  }

  @Node({ name: 'end' })
  async end(@Data() data: DataDto, @Value() value: ValueDto) {
    // Interested what happened if: throw new Error('TA DA...');
    data.global = `${data.global}, received a value from previous task(${value.local})`;
  }
}
