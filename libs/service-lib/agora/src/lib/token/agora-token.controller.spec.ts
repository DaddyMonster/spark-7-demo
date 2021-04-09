import { Test, TestingModule } from '@nestjs/testing';
import { AgoraTokenController } from './agora-token.controller';

describe('AgoraTokenController', () => {
  let controller: AgoraTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgoraTokenController],
    }).compile();

    controller = module.get<AgoraTokenController>(AgoraTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
