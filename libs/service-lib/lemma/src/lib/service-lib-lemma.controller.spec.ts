import { Test } from '@nestjs/testing';
import { ServiceLibLemmaController } from './service-lib-lemma.controller';
import { ServiceLibLemmaService } from './service-lib-lemma.service';

describe('ServiceLibLemmaController', () => {
  let controller: ServiceLibLemmaController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceLibLemmaService],
      controllers: [ServiceLibLemmaController],
    }).compile();

    controller = module.get(ServiceLibLemmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
