import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { HouseModule } from './house/house.module';
import { ImageModule } from './image/image.module';
import { User } from './user/user.entity';
import { Reservation } from './reservation/reservation.entity';
import { House } from './house/house.entity';
import { Image } from './image/image.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SoldModule } from './sold/sold.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.enkor',
      entities: [User, Reservation, House, Image],
      synchronize: true,
    }),
    UserModule,
    ReservationModule,
    HouseModule,
    ImageModule,
    AuthModule,
    SoldModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
