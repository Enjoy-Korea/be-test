import * as bcrypt from 'bcrypt';
import {
  CreateUserRepositoryInputDto,
  ICreateUserRepository,
  ICheckEmailDuplicateRepository,
} from '../../../src/auth/interfaces';
import { User } from '../../../src/entities';
import { SignupService } from '../../../src/auth/services';
import { ConflictException } from '@nestjs/common';

class FakeCheckEmailDuplicateRepository
  implements ICheckEmailDuplicateRepository
{
  private readonly users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  async execute(email: string) {
    const user = this.users.find((user) => user.email === email);
    return Promise.resolve(user !== undefined);
  }
}

class FakeCreateUserRepository implements ICreateUserRepository {
  async execute(params: CreateUserRepositoryInputDto) {
    return Promise.resolve({
      id: '2',
      email: params.email,
      password: params.password,
      getId() {
        return '2';
      },
    });
  }
}

let signupService: SignupService;
const email = 'test1234@gmail.com';
const password = 'test1234!';
let hashedPassword: string;
let users: User[];

describe('SignupService 유닛 테스트', () => {
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

    signupService = new SignupService(
      new FakeCheckEmailDuplicateRepository(users),
      new FakeCreateUserRepository(),
    );
  });

  test('SignupService를 인스턴스로 생성할 수 있다.', async () => {
    expect(signupService).toBeDefined();
  });

  test('사용 중인 이메일일 경우 409 에러를 반환한다.', async () => {
    await expect(
      signupService.execute({
        email,
        password,
      }),
    ).rejects.toThrow(ConflictException);
  });

  test('정상적인 요청에 대해 string 타입의 userId를 반환한다.', async () => {
    const res = await signupService.execute({
      email: 'notexists@gmail.com',
      password,
    });

    expect(res).toEqual('2');
  });
});
