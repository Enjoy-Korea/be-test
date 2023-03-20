import { Reservation } from '../../../src/entities';
import {
  CheckReservationAvailableRepositoryInputDto,
  CreateReservationRepositoryInputDto,
  ICheckReservationAvailableRepository,
  ICreateReservationRepository,
} from '../../../src/reservation/interfaces';
import { CreateReservationService } from '../../../src/reservation/services';
import { FakeGetHouseByIdRepository } from '../../house/services/get-house-by-id.service.spec';
import { houseFakers } from '../../fakers/house-fakers';
import { BadRequestException } from '@nestjs/common';

class FakeCheckReservationAvailabeRepository
  implements ICheckReservationAvailableRepository
{
  async execute(
    params: CheckReservationAvailableRepositoryInputDto,
  ): Promise<boolean> {
    return +params.houseId % 2 ? true : false;
  }
}

const userId = '1';
const houseId = '1';
const checkInAt = '20230301';
const checkOutAt = '20230331';
const duration = 30;

class FakeCreateReservationRepository implements ICreateReservationRepository {
  async execute(
    params: CreateReservationRepositoryInputDto,
  ): Promise<Reservation> {
    return Promise.resolve(
      new Reservation(
        params.userId,
        params.houseId,
        params.checkInAt,
        params.checkOutAt,
        params.duration,
        params.totalPrice,
        '1',
      ),
    );
  }
}

let createReservationService: CreateReservationService;

describe('CreateReservationService 유닛 테스트', () => {
  createReservationService = new CreateReservationService(
    new FakeGetHouseByIdRepository(houseFakers),
    new FakeCheckReservationAvailabeRepository(),
    new FakeCreateReservationRepository(),
  );

  test('CreateReservationService를 인스턴스로 생성할 수 있다', async () => {
    expect(createReservationService).toBeDefined();
  });

  test('정상적인 요청에 대해 string 타입의 reservationId를 반환한다.', async () => {
    const res = await createReservationService.execute({
      userId,
      houseId,
      checkInAt,
      checkOutAt,
      duration,
    });

    expect(res).toEqual({ reservationId: '1' });
  });

  test('존재하지 않는 숙소에 대한 예약에 대해 400 에러를 반환한다', async () => {
    await expect(
      createReservationService.execute({
        userId,
        houseId: '11',
        checkInAt,
        checkOutAt,
        duration,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  test('예약이 불가능한 숙소 예약에 대해 400 에러를 반환한다', async () => {
    await expect(
      createReservationService.execute({
        userId,
        houseId: '4',
        checkInAt,
        checkOutAt,
        duration,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
