import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceBookController } from './reference-book.controller';
import { ReferenceBookService } from './reference-book.service';

describe('ReferenceBookController', () => {
  let controller: ReferenceBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferenceBookController],
      providers: [ReferenceBookService],
    }).compile();

    controller = module.get<ReferenceBookController>(ReferenceBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
