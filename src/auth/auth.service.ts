import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dtos/auth.dto';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,       // JSON Web Toekn을 생성하고 검증하는 서비스
    private configService: ConfigService, // JWT의 비밀키와 만료시간을 설정한다. 
  ) { }

  async signUp(createUserDto: CreateUserDto) {
    const userExists = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.userService.create({ ...createUserDto, password: hash });

    // accessToken, refreshToken 2개의 토큰을 생성한다. 
    const tokens = await this.getTokens(newUser.id.toString(), newUser.email);
    await this.updateRefreshToken(newUser.id.toString(), tokens.refreshToken);

    return tokens;
  }

  async signIn(data: AuthDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    
    const tokens = await this.getTokens(user.id.toString(), user.email);
    await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);
    console.log('tokens', tokens);
    return tokens;
  }

  async logout(userId: string) {
    return this.userService.update(parseInt(userId), { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(parseInt(userId), {
      refreshToken: hashedRefreshToken,
    });
  }

  /**
   * 
   * @param userId 
   * @param email 
   * @returns 
   * 
   * 사용자 ID와 email을 인자로 받아 Access Token과 Refresh Token을 생성하고 반환
   * jwtService.signAsync 메서드를 통해 JWT Access Token과 Refrest Token을 생성하고, 각각의 secret과 만료시간을 설정해주고 있다. 
   * 생성된 Token들은 Promise.all을 이용해 한번에 생성되고, 생성된 Token들을 Object형태로 묶어서 반환한다. 
   */
  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },    // JWT payload에 들어갈 내용을 객체 형태로 정의, sub는 JWT의 subject의미. 즉, JWT 발급받은 사용자의 식별자, email은 해당 사용자의 email정보. 이는 JWT에 필수적인 정보는 아니지만, 사용자의 추가 정보를 JWT에 담아두는 용도로 사용할 수 있다. 즉 userId와 email정보를 JWT payload에 담아서 반환할 수 있게 해준다. 
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '60m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(parseInt(userId));
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id.toString(), user.email);
    await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);
    return tokens;
  }

  
}