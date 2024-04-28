import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceBookService } from './reference-book.service';

describe('ReferenceBookService', () => {
  let service: ReferenceBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenceBookService],
    }).compile();

    service = module.get<ReferenceBookService>(ReferenceBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
