import { GetHousesReqDto } from '../../../src/house/dtos';
import { plainToInstance } from 'class-transformer';
import { _validate } from '../../utils/validate';

let page: number;
let sort: string;
let limit: number;
let order: string;

describe('GetHousesReqDto 유닛 테스트', () => {
  test('아무런 쿼리값이 없을 경우 page=1, sort=createdAt, limit=5, order=desc를 반환한다.', async () => {
    const getHousesReqDto = plainToInstance(GetHousesReqDto, {});
    expect(getHousesReqDto).not.toStrictEqual({
      page: 1,
      sort: 'createdAt',
      limit: 5,
      order: 'desc',
    });
  });

  test('1 미만의 페이지에 대해 에러를 반환한다.', async () => {
    page = 0;
    const getHousesReqDto = plainToInstance(GetHousesReqDto, { page });
    const errors = await _validate(getHousesReqDto);
    expect(errors.length).not.toBe(0);
  });

  test('정렬 enum에 포함되지 않는 값에 대해 에러를 반환한다.', async () => {
    sort = 'updatedAt';
    const getHousesReqDto = plainToInstance(GetHousesReqDto, { sort });
    const errors = await _validate(getHousesReqDto);
    expect(errors.length).not.toBe(0);
  });

  test('30을 초과하는 limit 값에 대해 에러를 반환한다.', async () => {
    limit = 31;
    const getHousesReqDto = plainToInstance(GetHousesReqDto, { limit });
    const errors = await _validate(getHousesReqDto);
    expect(errors.length).not.toBe(0);
  });

  test('asc(오름차순), desc(내림차순) 외 순서에 대해 에러를 반환한다.', async () => {
    order = 'aesc';
    const getHousesReqDto = plainToInstance(GetHousesReqDto, { order });
    const errors = await _validate(getHousesReqDto);
    expect(errors.length).not.toBe(0);
  });
});
