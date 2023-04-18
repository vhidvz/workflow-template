import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppWorkflow } from './app.workflow';
import { AppProvider } from './app.provider';
import { App, AppSchema } from './schemas';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, AppWorkflow, AppRepository, AppProvider],
})
export class AppModule {}
