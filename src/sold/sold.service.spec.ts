import { Test, TestingModule } from '@nestjs/testing';
import { SoldService } from './sold.service';

describe('SoldService', () => {
  let service: SoldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldService],
    }).compile();

    service = module.get<SoldService>(SoldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
