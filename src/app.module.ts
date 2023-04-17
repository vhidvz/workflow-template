import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppWorkflow } from './app.workflow';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppWorkflow],
})
export class AppModule {}
