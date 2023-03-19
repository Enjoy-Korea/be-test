import { getDuration } from '../../../src/reservation/utils/get-duration';
import { BadRequestException } from '@nestjs/common';

describe('getDuration 유닛 테스트', () => {
  test('2023년 3월 1일부터 31일까지 예약할 경우 31일을 반환한다', () => {
    const res = getDuration('20230301', '20230331');

    expect(res).toEqual(31);
  });

  test('30일 미만의 예약일에 대해 400 에러를 반환한다', () => {
    expect(() => getDuration('20230301', '20230329')).toThrow(
      BadRequestException,
    );
  });
});
