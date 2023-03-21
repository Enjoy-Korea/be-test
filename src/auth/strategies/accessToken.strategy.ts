import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT에서 인코딩된 payload의 타입을 정의하는 타입
 *  ** JWT의 payload
 *      JWT의 payload는 해당 JWR의 정보를 담고 있는 부분. 
 *      payload에는 클라이언트 식별정보, 권한정보, 사용자 데이터 등의 정보가 담겨있다. 
 * 
 *      JWT는 크게 3부분으로 나눠져있으며 header, signature, payload가 그것이다. 
 *      payload는 Base64로 인코딩되어있다. 
 * 
 *      일반적으로 payload는 클라이언트나 서버에서 디코딩하여 사용된다. 
 * 
 *      JWT payload가 담고 있는 내용
 *      1. sub: JWT가 대상인 사용자의 식별자
 *      2. iss: JWT를 발급한 발급자
 *      3. iat: JWT발급된 시간
 *      4. exp: JWT만료 시간
 *      5. aud: JWT사용할 수신자
 *      6. data: JWT에 포함될 사용자 데이터
 * JWT payload는 보통 인증된 사용자에 대한 정보를 포함하며, 이 정보는 JWT를 발급하는 서버에서 정의된다. 
 */
type JwtPayload = {
  sub: string;
  username: string; // JWT 표준에 정의된 claim은 아니지만 개발자가 직접 정의한 claim. 이거 나중에 email로 바꿔야함
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  /**
   * 
   * @param payload 
   * @returns 
   * 
   * JWT에서 추출한 payload검증하는 로직.
   * 이 예제에선 payload그대로 반환하도록 구현. 
   * 
   * 이 메소드는 PassportStrategy클래스를 확장할 때 구현해야 하는 메소드 중 하나이며, 인증이 성공한 경우 호출된다. 
   */
  validate(payload: JwtPayload) {
    return payload;
  }
}