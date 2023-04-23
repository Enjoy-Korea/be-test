import { Controller, Post, Body } from '@nestjs/common';
import { UserDTO } from './interface/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServeice: AuthService) {}

  @Post('/signup')
  async userSignUp(@Body() userSignUpInfo: UserDTO) {
    return this.authServeice.userSignUp(userSignUpInfo);
  }

  @Post('/login')
  async userLogin(@Body() userLoginInfo: UserDTO) {
    return this.authServeice.userLogin(userLoginInfo);
  }
}
