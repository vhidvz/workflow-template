import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDto, ValueDto } from './dto';
import { ActivityPipe } from './pipes';
import { App } from './schemas';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workflows')
@Controller('flow')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<App> {
    return this.appService.find(id);
  }

  @Post()
  async create(@Body() data: DataDto): Promise<App> {
    return this.appService.create(data);
  }

  @Patch(':id/:activity')
  async update(
    @Body() value: ValueDto,
    @Param('id') id: string,
    @Param('activity', ActivityPipe) activity: string,
  ): Promise<App> {
    return this.appService.update(id, activity, value);
  }
}
