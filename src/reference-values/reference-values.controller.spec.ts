import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceValuesController } from './reference-values.controller';
import { ReferenceValuesService } from './reference-values.service';

describe('ReferenceValuesController', () => {
  let controller: ReferenceValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferenceValuesController],
      providers: [ReferenceValuesService],
    }).compile();

    controller = module.get<ReferenceValuesController>(
      ReferenceValuesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
