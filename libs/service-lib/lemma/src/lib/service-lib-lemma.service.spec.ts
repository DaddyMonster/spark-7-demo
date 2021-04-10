import { Test } from '@nestjs/testing';
import { ServiceLibLemmaService } from './service-lib-lemma.service';

describe('ServiceLibLemmaService', () => {
  let service: ServiceLibLemmaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceLibLemmaService],
    }).compile();

    service = module.get(ServiceLibLemmaService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
