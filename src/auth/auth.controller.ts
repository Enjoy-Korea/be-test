import {
    Body,
    Controller,
    Get,
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
    signin(@Body() data: AuthDto, @Req() req: any) {
        const result = this.authService.signIn(data);
        return result;
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: RequestWithUser) {
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
