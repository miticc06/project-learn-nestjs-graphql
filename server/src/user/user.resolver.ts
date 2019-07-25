import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserInput } from './user.input';
import { User } from "./user.entity";
import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';
@Resolver('User')
export class UserResolver {

    constructor(private readonly userService: UserService) { }

    @Query(() => String)
    async hello() {
        return 'world';
    }

    @Query(() => [User])
    async users() {
        return this.userService.findAll();
    }


    @Mutation(() => User)
    async createUser(@Args('input') input: UserInput) {
        return await this.userService.createUser(input);
    }

}
