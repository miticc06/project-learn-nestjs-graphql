import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { EventInput } from './event.input'
@Resolver('Event')
export class EventResolver {
    constructor(private readonly eventService: EventService) {

    }

    // @Query(() => [Event]) 
    // async events() {

    // }


    @Mutation(() => [Event])
    async createEvent(@Args('eventInput') eventInput: EventInput) {
        return this.eventService.createEvent(eventInput);
    }

}
