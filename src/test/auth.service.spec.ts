import { Test } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { RepositoriesService } from '../repositories/repositories.service';
import { ConfigService } from '@nestjs/config';
import { UserDTO } from '../auth/interface/auth.dto';
import { Users } from 'src/repositories/entity/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let repositoriesService: RepositoriesService;
  let configService: ConfigService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: RepositoriesService,
          useValue: {
            getUser: jest.fn(),
            upsertUser: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
    repositoriesService =
      moduleRef.get<RepositoriesService>(RepositoriesService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  describe('userLogin', () => {
    it('should return access and refresh tokens if successful', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = await bcrypt.hash(password, 10);
      const correctUser: Users = { email, password: hashedPassword };

      const userLoginInfo: UserDTO = { email, password };

      const accessToken = 'accessToken';
      const refreshToken = 'refreshToken';

      jest.spyOn(repositoriesService, 'getUser').mockResolvedValue(correctUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest
        .spyOn(JwtService.prototype, 'sign')
        .mockImplementation((payload: any) => {
          if (payload && payload.tokenType === 'accessToken') {
            return accessToken;
          } else if (payload && payload.tokenType === 'refreshToken') {
            return refreshToken;
          }
        });

      const result = await service.userLogin(userLoginInfo);

      expect(result).toHaveProperty('accessToken', accessToken);
      expect(result).toHaveProperty('refreshToken', refreshToken);
      expect(repositoriesService.getUser).toHaveBeenCalledWith(email);
    });

    it('should throw UnauthorizedException if email is invalid', async () => {
      const email = 'invalid@example.com';
      const password = 'password';

      const userLoginInfo: UserDTO = { email, password };

      jest.spyOn(repositoriesService, 'getUser').mockResolvedValue(null);

      await expect(service.userLogin(userLoginInfo)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'invalidPassword';
      const hashedPassword = await bcrypt.hash('password', 10);
      const correctUser: Users = { email, password: hashedPassword };

      const userLoginInfo: UserDTO = { email, password };

      jest.spyOn(repositoriesService, 'getUser').mockResolvedValue(correctUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(service.userLogin(userLoginInfo)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('userSignUp', () => {
    it('should create user and return result', async () => {
      const testUser: UserDTO = {
        email: 'test@example.com',
        password: 'testpassword',
      };

      const expectedResult = { email: testUser.email, message: 'signUp' };

      (repositoriesService.upsertUser as jest.Mock).mockResolvedValue(
        expectedResult,
      );

      const result = await service.userSignUp(testUser);

      expect(repositoriesService.upsertUser).toHaveBeenCalledWith(testUser);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('userlogout', () => {
    it('should return an object with message "logout" after successfully logging out the user', async () => {
      const user = { email: 'test@example.com', password: 'testpassword' };
      const upsertUserSpy = jest.spyOn(repositoriesService, 'upsertUser');
      const getUserSpy = jest
        .spyOn(repositoriesService, 'getUser')
        .mockResolvedValueOnce(user);

      const result = await service.userlogout(user);

      expect(getUserSpy).toHaveBeenCalledWith(user.email);
      expect(upsertUserSpy).toHaveBeenCalledWith({ ...user, refreshToken: '' });
      expect(result).toEqual({ message: 'logout' });
    });
  });
});
