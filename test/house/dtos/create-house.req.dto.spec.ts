import { CreateHouseReqDto } from '../../../src/house/dtos';
import { plainToInstance } from 'class-transformer';
import { map, pipe, range, toArray } from '@fxts/core';
import { _validate } from '../../utils/validate';

let university: string | undefined;
let houseType: string;
let pricePerDay: number;
let url: string;

describe('CreateHouseReqDto 유닛 테스트', () => {
  test('enum에 속하지 않는 houseType에 대해 에러를 반환한다.', async () => {
    houseType = '팬션';
    const createHouseReqDto = plainToInstance(CreateHouseReqDto, { houseType });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).not.toBe(0);
  });

  test('인근 대학이 undefined일 경우에 대해 에러를 반환하지 않는다.', async () => {
    const createHouseReqDto = plainToInstance(CreateHouseReqDto, {
      university,
    });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).toBe(0);
  });

  test('음수인 가격에 대해 에러를 반환한다.', async () => {
    pricePerDay = -1;
    const createHouseReqDto = plainToInstance(CreateHouseReqDto, {
      pricePerDay,
    });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).not.toBe(0);
  });

  test('url 형식이 아닌 이미지에 대해 에러를 반환한다.', async () => {
    url = 'htt//www.s3.enkor-be-test.com/thumbnails/1234';
    const createHouseReqDto = plainToInstance(CreateHouseReqDto, {
      images: [{ url, key: 1 }],
    });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).not.toBe(0);
  });

  test('url 형식의 이미지에 대해 에러를 반환하지 않는다.', async () => {
    url = 'https://www.s3.enkor-be-test.com/thumbnails/1234';
    const createHouseReqDto = plainToInstance(CreateHouseReqDto, {
      images: [{ url, key: 1 }],
    });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).toBe(0);
  });

  test('10장을 초과하는 이미지 등록에 대해 에러를 반환한다.', async () => {
    url = 'https://www.s3.enkor-be-test.com/thumbnails/1234';
    const createHouseReqDto = plainToInstance(CreateHouseReqDto, {
      images: pipe(
        range(11),
        map((i) => ({ url, key: i + 1 })),
        toArray,
      ),
    });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).not.toBe(0);
  });
});
