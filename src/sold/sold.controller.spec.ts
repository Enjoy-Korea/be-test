import { Test, TestingModule } from '@nestjs/testing';
import { SoldController } from './sold.controller';

describe('SoldController', () => {
  let controller: SoldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoldController],
    }).compile();

    controller = module.get<SoldController>(SoldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
