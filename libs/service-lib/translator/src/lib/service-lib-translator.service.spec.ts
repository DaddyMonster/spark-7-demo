import { Test } from '@nestjs/testing';
import { ServiceLibTranslatorService } from './service-lib-translator.service';

describe('ServiceLibTranslatorService', () => {
  let service: ServiceLibTranslatorService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceLibTranslatorService],
    }).compile();

    service = module.get(ServiceLibTranslatorService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
