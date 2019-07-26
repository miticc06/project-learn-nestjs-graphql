import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { BookingInput } from './booking.input';

@Resolver('Booking')
export class BookingResolver {

    constructor(
        private readonly bookingService: BookingService
    ) { }

    @Query(() => [Booking])
    async bookings() {
        return this.bookingService.findAll();
    }

    @Mutation(() => Booking)
    async createBooking(@Args('bookingInput') bookingInput: BookingInput) {
        return this.bookingService.createBooking(bookingInput);
    }


}
