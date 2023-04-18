import { Injectable } from '@nestjs/common';

@Injectable()
export class AppProvider {
  async getHello(value: string): Promise<string> {
    return `Hello ${value}!`;
  }
}
