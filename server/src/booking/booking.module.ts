import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from "./booking.entity";
import { UserModule } from '../user/user.module';
import { EventModule } from '../event/event.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    UserModule,
    EventModule
  ],
  providers: [BookingService, BookingResolver]
})
export class BookingModule { }
