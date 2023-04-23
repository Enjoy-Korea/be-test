import {
  HttpException,
  UnauthorizedException,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { UserDTO } from './interface/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private repositoriesService: RepositoriesService) {}

  async userLogin(userLoginInfo: UserDTO) {
    const { email, password } = userLoginInfo;
    const correctUser = await this.repositoriesService.getUser(email);

    if (!correctUser) throw new UnauthorizedException('Invalid email');
    const checkPassword = await bcrypt.compare(password, correctUser.password);

    if (!checkPassword) throw new UnauthorizedException('Invalid password');

    // 토큰 발급해서 주는 로직 추가~~
  }

  async userSignUp(userSignUpInfo: UserDTO) {
    const { email, password } = userSignUpInfo;
    const correctUser = await this.repositoriesService.getUser(email);
    if (correctUser) throw new BadRequestException('Email is already taken.');

    userSignUpInfo.password = await bcrypt.hash(password, 10);

    return await this.repositoriesService.createUser(userSignUpInfo);
  }
}
