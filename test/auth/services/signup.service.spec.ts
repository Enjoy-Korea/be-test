import { SignupService } from '../../../src/auth/services/signup.service';

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(async () => {
    // service = module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
