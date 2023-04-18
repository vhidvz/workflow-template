import { AppRepository } from './app.repository';
import { AppWorkflow } from './app.workflow';
import { Injectable } from '@nestjs/common';
import { DataDto, ValueDto } from './dtos';
import { Context } from '@vhidvz/wfjs';

@Injectable()
export class AppService {
  constructor(
    private readonly appWorkflow: AppWorkflow,
    private readonly appRepository: AppRepository,
  ) {}

  /**
   * This is an asynchronous function that returns the result of finding an item with a specific ID in
   * the app repository.
   *
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of an
   * entity that we want to find in the database. The `find` method is used to retrieve an entity from
   * the database based on its `id`. The `async` keyword indicates that the method returns a promise
   * that resolves to
   *
   * @returns The `find` method is being called on the `appRepository` object with the `id` parameter,
   * and the result of that method call is being returned. The `await` keyword is used to wait for the
   * `find` method to complete before returning its result. The specific data type of the returned
   * value is not specified in the code snippet.
   */
  async find(id: string) {
    return await this.appRepository.find(id);
  }

  /**
   * This function creates a new item in the app repository using data passed in and the context
   * returned from executing the app workflow.
   *
   * @param {string} data - The `data` parameter is a string that is passed as an argument to the
   * `create` method. It is then used as input to the `execute` method of the `appWorkflow` object. The
   * `context` object returned from the `execute` method is then used as input to the
   *
   * @returns The `create` method is returning the result of calling the `create` method of the
   * `appRepository` with the `context` object obtained from executing the `appWorkflow` with the
   * provided `data` parameter.
   */
  async create(data: DataDto) {
    // if you have only one start point this is OK
    const { context } = await this.appWorkflow.execute({ data });

    return await this.appRepository.create(context);
  }

  /**
   * This is an async function that updates an app's context based on a given activity and value.
   *
   * @param {string} id - The ID of the app that needs to be updated.
   * @param {string} activity - The `activity` parameter is a string that represents the name of the
   * activity that needs to be executed in the workflow.
   * @param {string} value - The value parameter is a string that represents the input value to be
   * passed to the appWorkflow.execute() method. It is used to update the context of the app with the
   * result of the workflow execution.
   *
   * @returns The `update` method is returning the updated context after executing the specified
   * activity on the given id.
   */
  async update(id: string, activity: string, value: ValueDto) {
    const ctx = await this.appRepository.find(id);

    const { context } = await this.appWorkflow.execute({
      value,
      node: { name: activity },
      context: Context.deserialize(ctx.toJSON()),
    });

    return await this.appRepository.update(id, context);
  }
}
