import { Test, TestingModule } from '@nestjs/testing';
import { AgoraTokenService } from './agora-token.service';

describe('AgoraTokenService', () => {
  let service: AgoraTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgoraTokenService],
    }).compile();

    service = module.get<AgoraTokenService>(AgoraTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
