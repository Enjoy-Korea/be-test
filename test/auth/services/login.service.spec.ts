import * as bcrypt from 'bcrypt';
import { User } from '../../../src/entities/user.entity';
import { LoginService } from '../../../src/auth/services/login.service';
import { IGetUserByEmailRepository } from '../../../src/auth/interfaces/i-get-user-by-email.repository';
import { BadRequestException } from '@nestjs/common';

class FakeGetUserByEmailRepository implements IGetUserByEmailRepository {
  private readonly users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  async execute(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user) return Promise.resolve(null);
    return Promise.resolve(user);
  }
}

let loginService: LoginService;
const email = 'test1234@gmail.com';
const password = 'test1234!';
let hashedPassword: string;
let users: User[];

describe('LoginService 유닛 테스트', () => {
  beforeEach(async () => {
    hashedPassword = await bcrypt.hash(password, 12);
    users = [
      {
        id: '1',
        email,
        password: hashedPassword,
        getId() {
          return '1';
        },
      },
    ];
    loginService = new LoginService(new FakeGetUserByEmailRepository(users));
  });

  test('AuthLoginService를 인스턴스로 생성할 수 있다.', async () => {
    expect(loginService).toBeDefined();
  });

  test('가입되지 않은 이메일에 대해 400 상태코드를 반환한다', async () => {
    await expect(
      loginService.execute({ email: 'test123@gmail.com', password: password }),
    ).rejects.toThrow(BadRequestException);
  });

  test('잘못된 비밀번호일 경우 400 에러를 반환한다.', async () => {
    await expect(
      loginService.execute({
        email: 'test1234@gmail.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  test('이메일/비밀번호가 정상일 경우 userId를 반환한다', async () => {
    const result = await loginService.execute({
      email: 'test1234@gmail.com',
      password: password,
    });
    expect(result).toEqual('1');
  });
});
