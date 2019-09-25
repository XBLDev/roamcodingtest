import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppUtil } from './app.util';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppUtil],
})
export class AppModule {}
