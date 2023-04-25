import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesService } from '../repositories/repositories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../repositories/entity/users.entity';
import { HouseImages } from '../repositories/entity/houseimages.entity';
import { Houses } from '../repositories/entity/houses.entity';
import { Bookings } from '../repositories/entity/bookings.entity';
import { Repository, QueryRunner } from 'typeorm';
import { CreateHouseDTO } from 'src/house/interface/house.dto';
import { BookingInfoDTO } from 'src/booking/interface/bookingInfo.dto';

describe('RepositoriesService', () => {
  let service: RepositoriesService;
  let usersRepository: Repository<Users>;
  let houseImagesRepository: Repository<HouseImages>;
  let housesRepository: Repository<Houses>;
  let bookingsRepository: Repository<Bookings>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepositoriesService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(HouseImages),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Houses),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Bookings),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RepositoriesService>(RepositoriesService);
    usersRepository = module.get(getRepositoryToken(Users));
    houseImagesRepository = module.get(getRepositoryToken(HouseImages));
    housesRepository = module.get(getRepositoryToken(Houses));
    bookingsRepository = module.get(getRepositoryToken(Bookings));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(houseImagesRepository).toBeDefined();
    expect(housesRepository).toBeDefined();
    expect(bookingsRepository).toBeDefined();
  });

  // 여기에 각 메서드에 대한 테스트 케이스를 추가하세요.
  // 예를 들어, 다음과 같이 upsertUser 메서드에 대한 테스트 케이스를 추가할 수 있습니다.

  describe('upsertUser', () => {
    it('should save user and return signUp message', async () => {
      const userInfo = {
        email: 'test@example.com',
        password: 'password123',
      };

      const expectedResult = {
        email: userInfo.email,
        message: 'signUp',
      };

      jest.spyOn(usersRepository, 'save').mockResolvedValueOnce(null);

      const result = await service.upsertUser(userInfo);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException when save fails', async () => {
      const userInfo = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());

      await expect(service.upsertUser(userInfo)).rejects.toThrowError();
    });
  });

  describe('getUser', () => {
    it('should return vaild User', async () => {
      const user = new Users();
      user.email = 'email@gmail.com';

      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(user);
      const result = await service.getUser('email@gmail.com');
      expect(result).toEqual({ email: 'email@gmail.com' });
    });

    it('should return null when email does not exist', async () => {
      const userEmail = 'nonexistent@example.com';

      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);

      const result = await service.getUser(userEmail);
      expect(result).toBeNull();
    });

    it('should throw InternalServerErrorException when findOne fails', async () => {
      const userEmail = 'test@example.com';

      jest.spyOn(usersRepository, 'findOne').mockRejectedValueOnce(new Error());

      await expect(service.getUser(userEmail)).rejects.toThrowError();
    });
  });

  describe('createHouse', () => {
    it('should save house and return house info', async () => {
      const houseInfo: CreateHouseDTO = {
        name: 'name',
        description: 'description',
        address: 'address',
        university: 'university',
        houseType: 'houseType',
        pricePerDay: 10000,
        images: [
          {
            url: 'test-image-url-1',
            key: 1,
          },
          {
            url: 'test-image-url-2',
            key: 2,
          },
        ],
      };

      const createdhouse = new Houses();
      createdhouse.id = 1;
      createdhouse.name = houseInfo.name;
      createdhouse.description = houseInfo.description;
      createdhouse.address = houseInfo.address;
      createdhouse.houseType = houseInfo.houseType;
      createdhouse.pricePerDay = houseInfo.pricePerDay;
      createdhouse.university = houseInfo.university;

      jest.spyOn(housesRepository, 'save').mockResolvedValueOnce(createdhouse);

      const result = await service.createHouse(houseInfo);
      expect(result).toEqual(createdhouse);
    });
  });

  describe('getHouseDetail', () => {
    it('should return house detail info', async () => {
      const houseId = 1;

      const houseInfo: CreateHouseDTO = {
        name: 'name',
        description: 'description',
        address: 'address',
        university: 'university',
        houseType: 'houseType',
        pricePerDay: 10000,
        images: [
          {
            url: 'test-image-url-1',
            key: 1,
          },
          {
            url: 'test-image-url-2',
            key: 2,
          },
        ],
      };
      const createdhouse = new Houses();
      createdhouse.id = 1;
      createdhouse.name = houseInfo.name;
      createdhouse.description = houseInfo.description;
      createdhouse.address = houseInfo.address;
      createdhouse.houseType = houseInfo.houseType;
      createdhouse.pricePerDay = houseInfo.pricePerDay;
      createdhouse.university = houseInfo.university;

      jest
        .spyOn(housesRepository, 'findOne')
        .mockResolvedValueOnce(createdhouse);

      const result = await service.getHouseDetail(houseId);
      expect(result).toEqual(createdhouse);
    });
  });

  describe('getHouseList', () => {
    it('should return house list with pagination and order', async () => {
      const start = 0;
      const limit = 10;
      const sort = 'name';
      const order = 'ASC';

      const houseList = [
        {
          id: 1,
          name: 'name',
          description: 'description',
          address: 'address',
          university: 'university',
          houseType: 'houseType',
          pricePerDay: 10000,
          images: [
            {
              url: 'test-image-url-1',
              key: 1,
            },
            {
              url: 'test-image-url-2',
              key: 2,
            },
          ],
        },
        {
          id: 2,
          name: 'name',
          description: 'description',
          address: 'address',
          university: 'university',
          houseType: 'houseType',
          pricePerDay: 10000,
          images: [
            {
              url: 'test-image-url-1',
              key: 1,
            },
            {
              url: 'test-image-url-2',
              key: 2,
            },
          ],
        },
      ];

      jest.spyOn(housesRepository, 'find').mockResolvedValueOnce(houseList);

      const result = await service.getHouseList(start, limit, sort, order);

      expect(housesRepository.find).toHaveBeenCalledWith({
        skip: start,
        take: limit,
        relations: ['houseImages'],
        order: { [sort]: order },
      });
      expect(result).toEqual(houseList);
    });

    it('should throw an error if getting house list fails', async () => {
      const start = 0;
      const limit = 10;
      const sort = 'name';
      const order = 'ASC';

      jest
        .spyOn(housesRepository, 'find')
        .mockRejectedValueOnce(new Error('Test error'));

      await expect(
        service.getHouseList(start, limit, sort, order),
      ).rejects.toThrowError();
      expect(housesRepository.find).toHaveBeenCalledWith({
        skip: start,
        take: limit,
        relations: ['houseImages'],
        order: { [sort]: order },
      });
    });
  });

  describe('createBooking', () => {
    it('should create booking and result', async () => {
      const house: Houses = {
        id: 1,
        name: 'name',
        description: 'description',
        address: 'address',
        university: 'university',
        houseType: 'houseType',
        pricePerDay: 10000,
        images: [
          {
            url: 'test-image-url-1',
            key: 1,
          },
          {
            url: 'test-image-url-2',
            key: 2,
          },
        ],
      };

      const user: Users = {
        id: 1,
        email: 'test@gmail.com',
      };

      const booking: Bookings = {
        house: house,
        user: user,
        checkinDate: new Date('2023-01-01'),
        checkoutDate: new Date('2023-01-04'),
      };

      const bookingInfo: BookingInfoDTO = {
        houseId: 1,
        userId: 1,
        checkinDate: new Date('2023-01-01'),
        checkoutDate: new Date('2023-01-04'),
      };

      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(housesRepository, 'findOne').mockResolvedValueOnce(house);
      jest.spyOn(bookingsRepository, 'save').mockResolvedValueOnce(booking);
      const result = await service.createBooking(bookingInfo);

      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: bookingInfo.userId },
      });
      expect(housesRepository.findOne).toHaveBeenCalledWith({
        where: { id: bookingInfo.houseId },
      });
      expect(bookingsRepository.save).toHaveBeenCalledWith(booking);
      expect(result).toEqual(booking);
    });
    it('should throw an error if creating a booking fails', async () => {
      const bookingInfo: BookingInfoDTO = {
        userId: 1,
        houseId: 1,
        checkinDate: new Date('2023-05-01'),
        checkoutDate: new Date('2023-05-10'),
      };

      const user: Users = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
      };

      const house: Houses = {
        id: 1,
        name: 'name',
        description: 'description',
        address: 'address',
        university: 'university',
        houseType: 'houseType',
        pricePerDay: 10000,
        images: [
          {
            url: 'test-image-url-1',
            key: 1,
          },
          {
            url: 'test-image-url-2',
            key: 2,
          },
        ],
      };

      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(housesRepository, 'findOne').mockResolvedValueOnce(house);
      jest
        .spyOn(bookingsRepository, 'save')
        .mockRejectedValueOnce(new Error('Internal Server Error'));

      try {
        await service.createBooking(bookingInfo);
      } catch (error) {
        expect(usersRepository.findOne).toHaveBeenCalledWith({
          where: { id: bookingInfo.userId },
        });
        expect(housesRepository.findOne).toHaveBeenCalledWith({
          where: { id: bookingInfo.houseId },
        });
        expect(bookingsRepository.save).toHaveBeenCalled();
        expect(error.message).toEqual('Internal Server Error');
      }
    });
  });
  describe('getBookingList', () => {
    it('should return an array of bookings', async () => {
      const userId = 1;

      const user: Users = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
      };

      const house: Houses = {
        id: 1,
        name: 'name',
        description: 'description',
        address: 'address',
        university: 'university',
        houseType: 'houseType',
        pricePerDay: 10000,
        images: [
          {
            url: 'test-image-url-1',
            key: 1,
          },
          {
            url: 'test-image-url-2',
            key: 2,
          },
        ],
      };
      const bookingList: Bookings[] = [
        {
          id: 1,
          user: user,
          house: house,
          checkinDate: new Date('2023-05-01'),
          checkoutDate: new Date('2023-05-10'),
        },
        {
          id: 2,
          user: user,
          house: house,
          checkinDate: new Date('2023-06-01'),
          checkoutDate: new Date('2023-06-10'),
        },
      ];

      jest.spyOn(bookingsRepository, 'find').mockResolvedValue(bookingList);

      const result = await service.getBookingList(userId);

      expect(bookingsRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
      expect(result).toEqual(bookingList);
    });

    it('should throw an error if there is a problem with the database', async () => {
      const userId = 1;
      jest
        .spyOn(bookingsRepository, 'find')
        .mockRejectedValue(new Error('Internal Server Error'));

      try {
        await service.getBookingList(userId);
      } catch (error) {
        expect(bookingsRepository.find).toHaveBeenCalledWith({
          where: { user: { id: userId } },
        });
        expect(error.message).toEqual('Internal Server Error');
      }
    });
  });
  describe('createHouseImage', () => {
    it('should create house images', async () => {
      const house: Houses = {
        id: 1,
        name: 'name',
        description: 'description',
        address: 'address',
        university: 'university',
        houseType: 'houseType',
        pricePerDay: 10000,
        images: [
          {
            url: 'test-image-url-1',
            key: 1,
          },
          {
            url: 'test-image-url-2',
            key: 2,
          },
        ],
      };

      const houseImages: HouseImages[] = [
        {
          url: 'https://example.com/image1.jpg',
          key: 1,
          houses: house,
        },
        {
          url: 'https://example.com/image2.jpg',
          key: 2,
          houses: house,
        },
      ];
      jest
        .spyOn(houseImagesRepository, 'save')
        .mockResolvedValue(Promise.resolve(houseImages as any));

      const result = await service.createHouseImage(houseImages);

      expect(houseImagesRepository.save).toHaveBeenCalledWith(houseImages);
      expect(result).toEqual(houseImages);
    });
  });
});
