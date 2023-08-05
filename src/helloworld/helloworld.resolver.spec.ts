import { Test, TestingModule } from '@nestjs/testing';
import { HelloworldResolver } from './helloworld.resolver';

describe('HelloworldResolver', () => {
  let resolver: HelloworldResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloworldResolver],
    }).compile();

    resolver = module.get<HelloworldResolver>(HelloworldResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
