import { House } from '../../../src/entities';
import {
  CreateHouseRepositoryInputDto,
  ICreateHouseRepository,
} from '../../../src/house/interfaces';
import {
  CreateImagesRepositoryInputDto,
  ICreateImagesRepository,
} from '../../../src/image/interfaces/i-create-images.repository';
import { CreateHouseService } from '../../../src/house/services';

class FakeCreateHouseRepository implements ICreateHouseRepository {
  async execute(params: CreateHouseRepositoryInputDto): Promise<House> {
    return Promise.resolve(
      new House(
        params.name,
        params.description,
        params.address,
        params.houseType,
        params.pricePerDay,
        params.university,
        '1',
      ),
    );
  }
}

class FakeCreateImagesRepository implements ICreateImagesRepository {
  async execute(params: CreateImagesRepositoryInputDto): Promise<void> {
    return Promise.resolve();
  }
}

let createHouseService: CreateHouseService;
const id = '1';
const name = '산포리 펜션';

const description =
  '입실/퇴실 시간\n ㅁ 입실시간 : 오후 3시 ~ 오후 10시\n ㅁ 퇴실시간 : 익일 오전 11시 까지\n ㅁ 오후 10시 이후의 입실은 미리 연락부탁드립니다.';
const address = '경상북도 울진군 근남면 세포2길 1-21';
const university = '울진대학교';
const houseType = '펜션';
const pricePerDay = 30000;
const images = [
  {
    url: 'http://si.wsj.net/public/resources/images/OB-YO176_hodcol_H_20130815124744.jpg',
    key: 1,
  },
  {
    url: 'https://image.pensionlife.co.kr/penimg/pen_1/pen_19/1977/9734f7418fcc01a2321ba800b1f2c7ee.jpg',
    key: 2,
  },
];

describe('CreateHouseService 유닛 테스트', () => {
  createHouseService = new CreateHouseService(
    new FakeCreateHouseRepository(),
    new FakeCreateImagesRepository(),
  );

  test('CreateHouseService를 인스턴스로 생성할 수 있다', async () => {
    expect(createHouseService).toBeDefined();
  });

  test('정상적인 요청에 대해 string 타입의 houseId를 반환한다.', async () => {
    const res = await createHouseService.execute({
      name,
      description,
      address,
      houseType,
      pricePerDay,
      university,
      images,
    });

    expect(res).toEqual({ houseId: '1' });
  });
});
