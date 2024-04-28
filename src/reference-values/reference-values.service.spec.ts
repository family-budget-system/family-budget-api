import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceValuesService } from './reference-values.service';

describe('ReferenceValuesService', () => {
  let service: ReferenceValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenceValuesService],
    }).compile();

    service = module.get<ReferenceValuesService>(ReferenceValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
