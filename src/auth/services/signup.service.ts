import { Injectable, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  ISignupService,
  SignupServiceInputDto,
  ICreateUserRepository,
  ICheckEmailDuplicateRepository,
} from '../interfaces';
import {
  CheckEmailDuplicateRepository,
  CreateUserRepository,
} from '../repositories';

@Injectable()
export class SignupService implements ISignupService {
  constructor(
    @Inject(CheckEmailDuplicateRepository)
    private checkEmailDuplicateRepository: ICheckEmailDuplicateRepository,
    @Inject(CreateUserRepository)
    private createUserRepository: ICreateUserRepository,
  ) {}

  async execute(params: SignupServiceInputDto): Promise<string> {
    const { email, password } = params;
    const isEmailDuplicate = await this.checkEmailDuplicateRepository.execute(
      email,
    );
    if (isEmailDuplicate) {
      throw new ConflictException('가입된 이메일');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.createUserRepository.execute({
      email,
      password: hashedPassword,
    });
    return user.getId();
  }
}
