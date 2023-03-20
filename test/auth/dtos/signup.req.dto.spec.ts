import { SignupReqDto } from '../../../src/auth/dtos';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('SignupReqDto 유닛 테스트', () => {
  test('이메일 형식이 아닌 요청에 대해 에러를 반환한다.', async () => {
    const email = 'test1234@gmail.';
    const signupReqDto = plainToInstance(SignupReqDto, { email });
    const errors = await validate(signupReqDto, {
      skipMissingProperties: true,
    });
    expect(errors.length).not.toBe(0);
  });

  test('10자 미만의 이메일 형식에 대해 에러를 반환한다.', async () => {
    const email = 'te12@g.co';
    const signupReqDto = plainToInstance(SignupReqDto, { email });
    const errors = await validate(signupReqDto, {
      skipMissingProperties: true,
    });
    expect(errors.length).not.toBe(0);
  });

  test('40자 이상의 이메일 형식에 대해 에러를 반환한다.', async () => {
    const email = 'tests12345tests12345tests12345tests1234512345@gmail.com';
    const signupReqDto = plainToInstance(SignupReqDto, { email });
    const errors = await validate(signupReqDto, {
      skipMissingProperties: true,
    });
    expect(errors.length).not.toBe(0);
  });

  test('특수문자가 포함되지 않은 비밀번호에 대해 에러를 반환한다.', async () => {
    const password = 'test1234';
    const signupReqDto = plainToInstance(SignupReqDto, { password });
    const errors = await validate(signupReqDto, {
      skipMissingProperties: true,
    });
    expect(errors.length).not.toBe(0);
  });

  test('소문자가 포함되지 않은 비밀번호에 대해 에러를 반환한다.', async () => {
    const password = '12341234!';
    const signupReqDto = plainToInstance(SignupReqDto, { password });
    const errors = await validate(signupReqDto, {
      skipMissingProperties: true,
    });
    expect(errors.length).not.toBe(0);
  });

  test('숫자가 포함되지 않은 비밀번호에 대해 에러를 반환한다.', async () => {
    const password = 'abcdabcd!';
    const signupReqDto = plainToInstance(SignupReqDto, { password });
    const errors = await validate(signupReqDto, {
      skipMissingProperties: true,
    });
    expect(errors.length).not.toBe(0);
  });

  test('8자 미만의 비밀번호에 대해 에러를 반환한다.', async () => {
    const password = 'test12!';
    const signupReqDto = plainToInstance(SignupReqDto, { password });
    const errors = await validate(signupReqDto, {
      skipMissingProperties: true,
    });
    expect(errors.length).not.toBe(0);
  });

  test('16자를 초과하는 비밀번호에 대해 에러를 반환한다.', async () => {
    const password = 'test1234test1234!';
    const signupReqDto = plainToInstance(SignupReqDto, { password });
    const errors = await validate(signupReqDto, {
      skipMissingProperties: true,
    });
    expect(errors.length).not.toBe(0);
  });
});
