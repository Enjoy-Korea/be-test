import { Injectable, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  ISignupService,
  SignupServiceInputDto,
} from '../interfaces/i-signup.service';
import { ICheckEmailDuplicateRepository } from '../interfaces/i-check-email-duplicate.repository';
import { ICreateUserRepository } from '../interfaces/i-create-user.repository';
import { CheckEmailDuplicateRepository } from '../repositories/check-email-duplicate.repository';
import { CreateUserRepository } from '../repositories/create-user.repository';

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
