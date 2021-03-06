import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { BookingInput } from './booking.input';
import { UserService } from '../user/user.service';
import { EventService } from '../event/event.service';
import { Controller, Get, Request, Post, UseGuards, Headers } from '@nestjs/common';

import { UserId } from '../decorator/UserId';

@Resolver('Booking')
export class BookingResolver {

    constructor(
        private readonly bookingService: BookingService,
        private readonly userService: UserService,
        private readonly eventService: EventService

    ) { }

    @Query(() => [Booking])
    async bookings(@UserId() userId: any) {

        console.log(userId);

        return this.bookingService.findAll();
    }


    // @Get()
    // async getUserId(@UserId() userId: any) {
    //     console.log(userId);
    // }

    @Mutation(() => Booking)
    async createBooking(@Args('bookingInput') bookingInput: BookingInput) {
        // console.log('request:////////////////' + user);
        // console.log(this.getUserId(req));

        console.log();


        return this.bookingService.createBooking(bookingInput);
    }

    @Mutation(() => Booking) //cancelBooking(bookingId: String!, userId: String!): Booking!
    async cancelBooking(@Args('bookingId') bookingId: string, @Args('userId') userId: string) {

        return this.bookingService.cancelBooking(bookingId, userId);
    }

    @ResolveProperty('user')
    async user(@Parent() booking) {
        try {
            const userId = booking.user; // id user tao booking
            const user = await this.userService.findOne(userId);
            user.password = null;
            return user;

        } catch (err) {
            throw err;
        }

    }

    @ResolveProperty('event')
    async event(@Parent() booking) {
        try {
            const eventId = booking.event;
            return await this.eventService.findOne(eventId);

        } catch (error) {
            throw error;
        }
    }

}
