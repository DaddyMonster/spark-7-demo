import { Test } from '@nestjs/testing';
import { LogAuthService } from './log-auth.service';

describe('ServiceModuleLogAuthService', () => {
  let service: LogAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LogAuthService],
    }).compile();

    service = module.get(LogAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
