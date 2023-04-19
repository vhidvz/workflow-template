import { ContextInterface } from '@vhidvz/wfjs';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { App } from './schemas';

@Injectable()
export class AppRepository {
  constructor(@InjectModel(App.name) private appModel: Model<App>) {}

  async find(id: string) {
    return this.appModel.findById(id);
  }

  async create(context: ContextInterface) {
    return await this.appModel.create(context);
  }

  async update(id: string, context: ContextInterface) {
    return this.appModel.findByIdAndUpdate(id, context, { new: true });
  }
}
