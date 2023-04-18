import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDto, ValueDto } from './dtos';
import { ActivityPipe } from './pipes';
import { App } from './schemas';
import { ApiTags } from '@nestjs/swagger';

@Controller('flow')
@ApiTags('workflows')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<App> {
    return await this.appService.find(id);
  }

  @Post()
  async create(@Body() data: DataDto) {
    return await this.appService.create(data);
  }

  @Patch(':id/:activity')
  async update(
    @Body() value: ValueDto,
    @Param('id') id: string,
    @Param('activity', ActivityPipe) activity: string,
  ) {
    return await this.appService.update(id, activity, value);
  }
}
