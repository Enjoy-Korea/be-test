import { PickType } from '@nestjs/swagger';
import { SignupResDto } from './signup.res.dto';

export class LoginResDto extends PickType(SignupResDto, ['userId'] as const) {}
