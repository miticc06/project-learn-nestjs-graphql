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

    async findOne(bookingId: string): Promise<Booking> {
        return await this.bookingRepository.findOne({ _id: bookingId });
    }

    async createBooking(bookingInput: BookingInput): Promise<Booking> {
        const user = await this.userService.findOne(bookingInput.user);
        if (!user) {
            throw new UserInputError("UserId khong hop le!");
        }

        const event = await this.eventService.findOne(bookingInput.event);
        if (!event) {
            throw new UserInputError("eventId khong hop le!");
        }

        const booking = new Booking();
        booking._id = uuid.v4();
        booking.createdAt = new Date().toISOString();
        booking.event = bookingInput.event;
        booking.user = bookingInput.user;
        return await this.bookingRepository.save(booking);
    }

    async cancelBooking(bookingId: string, userId: string): Promise<Booking> { // userId này sau này sẽ get từ token ra
        const booking = await this.findOne(bookingId);
        if (!booking) {
            throw new UserInputError('bookingId khong hop le!');
        }

        const userBooking = await this.userService.findOne(userId);
        if (!userBooking) {
            throw new UserInputError('UserId khong hop le!');
        }

        if (userBooking._id !== booking.user) {
            throw new UserInputError('Ban khong co quyen cancel booking!');
        }

        await this.bookingRepository.deleteOne({ _id: bookingId });

        return booking;
    }

}
