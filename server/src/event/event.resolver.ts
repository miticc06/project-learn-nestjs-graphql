import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { EventService } from './event.service';
import { EventInput } from './event.input'
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { forwardRef, Inject } from '@nestjs/common';
@Resolver('Event')
export class EventResolver {
    constructor(
        private readonly eventService: EventService,
        private readonly userService: UserService,
    ) { }


    @ResolveProperty('creator')
    async creator(@Parent() user) {
        const creatorId = user.creator;
        let userres = new User();
        return await this.userService.findOne(creatorId);
    }

    @Mutation(() => [Event])
    async createEvent(@Args('eventInput') eventInput: EventInput) {
        return this.eventService.createEvent(eventInput);
    }

}
