import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private app_srv: AppService) {}

  @Get()
  checkConnection() {
    return this.app_srv.getData();
  }
}
