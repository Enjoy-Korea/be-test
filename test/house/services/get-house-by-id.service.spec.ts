import { IGetHouseByIdRepository } from '../../../src/house/interfaces';
import { House } from '../../../src/entities';
import { GetHouseByIdService } from '../../../src/house/services';
import { houseFakers } from '../../fakers/house-fakers';
import { BadRequestException } from '@nestjs/common';

class FakeGetHouseByIdRepository implements IGetHouseByIdRepository {
  constructor(private houses: House[]) {
    this.houses = houses;
  }

  async execute(houseId: string): Promise<House | null> {
    const house = this.houses.find((house) => house.id === houseId);
    if (!house) return Promise.resolve(null);
    return Promise.resolve(house);
  }
}

let getHouseByIdServiceSpec: GetHouseByIdService;

describe('GetHouseByIdService 유닛 테스트', () => {
  getHouseByIdServiceSpec = new GetHouseByIdService(
    new FakeGetHouseByIdRepository(houseFakers),
  );

  test('GetHouseByIdService를 인스턴스로 생성할 수 있다', async () => {
    expect(getHouseByIdServiceSpec).toBeDefined();
  });

  test('등록되어 있는 숙소를 조회할 경우 정상적인 결과를 반환한다', async () => {
    const res = await getHouseByIdServiceSpec.execute('5');

    expect(res.houseId).toEqual('5');
  });

  test('등록되지 않은 숙소를 조회할 경우 400 에러를 반환한다', async () => {
    await expect(getHouseByIdServiceSpec.execute('11')).rejects.toThrow(
      BadRequestException,
    );
  });
});
