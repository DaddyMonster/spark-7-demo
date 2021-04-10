import { Test } from '@nestjs/testing';
import { ServiceLibTranslatorController } from './service-lib-translator.controller';
import { ServiceLibTranslatorService } from './service-lib-translator.service';

describe('ServiceLibTranslatorController', () => {
  let controller: ServiceLibTranslatorController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceLibTranslatorService],
      controllers: [ServiceLibTranslatorController],
    }).compile();

    controller = module.get(ServiceLibTranslatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
