import { Injectable } from '@nestjs/common';

@Injectable()
export class AppProvider {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
