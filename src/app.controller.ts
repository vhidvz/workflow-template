import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.appService.find(id);
  }

  @Post()
  async create(@Body() data: string) {
    return await this.appService.create(data);
  }

  @Patch(':id/:activity')
  async update(
    @Body() value: string,
    @Param('id') id: string,
    @Param('activity') activity: string,
  ) {
    return await this.appService.update(id, activity, value);
  }
}
