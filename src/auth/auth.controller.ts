import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { AccessTokenGuard} from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

interface RequestWithUser extends Request {
    user?: { sub: string, refreshToken: string };
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    signin(@Body() data: AuthDto) {
        return this.authService.signIn(data);
    }

    /**
     * @param req
     * 
     * @Req() 데코레이터를 사용하는 이유는 request object를 추출하기 위함이다.
     * JWT strategy 때문에, user가 sign in했을 떄 user object가 존재하게 된다. 
     * 
     * req.user는 JWT strategy를 통해 인증된 사용자 정보를 저장하는 객체. 그러나 logout메소드는 JWT인증 없이 호출될 수 있으므로, req.user가 존재하지 않을수도 있음. 
     * 
     */
    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: RequestWithUser) {
        // 로직상 user가 없을수는 없는데 user없을떄 Exception날려야 되나?
        return this.authService.logout(req.user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: RequestWithUser) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
