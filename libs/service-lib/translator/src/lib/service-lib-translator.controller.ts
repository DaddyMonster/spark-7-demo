import { Body, Controller, Post } from '@nestjs/common';
import { TranslateDto } from './dto';
import { ServiceLibTranslatorService } from './service-lib-translator.service';

@Controller('tranlate')
export class ServiceLibTranslatorController {
  constructor(private trans_srv: ServiceLibTranslatorService) {}

  @Post()
  async getTranslated(@Body() args: TranslateDto) {
    return this.trans_srv.translate(args);
  }
}
