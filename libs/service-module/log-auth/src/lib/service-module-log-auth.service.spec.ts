import { Test } from '@nestjs/testing';
import { ServiceModuleLogAuthService } from './service-module-log-auth.service';

describe('ServiceModuleLogAuthService', () => {
  let service: ServiceModuleLogAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceModuleLogAuthService],
    }).compile();

    service = module.get(ServiceModuleLogAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
