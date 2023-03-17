import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GetUserByEmailRepository } from '../repositories/get-user-by-email.repository';
import { IGetUserByEmailRepository } from '../interfaces/i-get-user-by-email.repository';
import {
  ILoginService,
  LoginServiceInputDto,
} from '../interfaces/i-login.service';

@Injectable()
export class LoginService implements ILoginService {
  constructor(
    @Inject(GetUserByEmailRepository)
    private getUserByEamilOutboundPort: IGetUserByEmailRepository,
  ) {}

  async execute(params: LoginServiceInputDto): Promise<string> {
    const { email, password } = params;
    const user = await this.getUserByEamilOutboundPort.execute(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('이메일/비밀번호 재확인');
    }
    return user.getId();
  }
}
