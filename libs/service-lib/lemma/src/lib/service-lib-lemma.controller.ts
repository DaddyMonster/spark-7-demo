import { Controller } from '@nestjs/common';
import { ServiceLibLemmaService } from './service-lib-lemma.service';

@Controller('service-lib-lemma')
export class ServiceLibLemmaController {
  constructor(private serviceLibLemmaService: ServiceLibLemmaService) {}
}
