import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Booking } from './booking.entity';
import { BookingInput } from './booking.input';
import * as uuid from "uuid";
import { UserService } from '../user/user.service';
import { UserInputError } from 'apollo-server-core';
import { EventService } from '../event/event.service';
@Injectable()
export class BookingService {

    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: MongoRepository<Booking>,

        private readonly userService: UserService,
        private readonly eventService: EventService
    ) { }

    async findAll(): Promise<Booking[]> {
        return await this.bookingRepository.find();
    }

    async createBooking(bookingInput: BookingInput) {
        const user = await this.userService.findOne(bookingInput.userId);
        if (!user) {
            throw new UserInputError("UserId khong hop le!");
        }

        const event = await this.eventService.findOne(bookingInput.eventId);
        if (!event) {
            throw new UserInputError("eventId khong hop le!");
        }

        const booking = new Booking();
        booking._id = uuid.v4();
        booking.createdAt = new Date().toISOString();
        booking.eventId = bookingInput.eventId;
        booking.userId = bookingInput.userId;
        return await this.bookingRepository.save(booking);
    }

}
