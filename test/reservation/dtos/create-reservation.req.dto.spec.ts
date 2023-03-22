import { CreateReservationReqDto } from '../../../src/reservation/dtos';
import { plainToInstance } from 'class-transformer';
import { _validate } from '../../utils/validate';

let houseId: string;
let checkInAt: string;
let checkOutAt: string;

describe('CreateHouseReqDto 유닛 테스트', () => {
  test('1 미만의 houseId에 대해 에러를 반환한다.', async () => {
    houseId = '0';
    const createHouseReqDto = plainToInstance(CreateReservationReqDto, {
      houseId,
    });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).not.toBe(0);
  });

  test('8자가 아닌 checkInAt에 대해 에러를 반환한다.', async () => {
    checkInAt = '202301011';
    const createHouseReqDto = plainToInstance(CreateReservationReqDto, {
      checkInAt,
    });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).not.toBe(0);
  });

  test('8자가 아닌 checkOutAt에 대해 에러를 반환한다.', async () => {
    checkOutAt = '2023011';
    const createHouseReqDto = plainToInstance(CreateReservationReqDto, {
      checkOutAt,
    });
    const errors = await _validate(createHouseReqDto);
    expect(errors.length).not.toBe(0);
  });
});
