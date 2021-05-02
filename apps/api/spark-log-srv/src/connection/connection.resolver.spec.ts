import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionResolver } from './connection.resolver';

describe('ConnectionResolver', () => {
  let resolver: ConnectionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionResolver],
    }).compile();

    resolver = module.get<ConnectionResolver>(ConnectionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
