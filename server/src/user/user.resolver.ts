import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { UserInput } from './user.input';
import { User, AuthData } from "./user.entity";
import { UserService } from './user.service';
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

    @Mutation(() => AuthData)
    async login(@Args('input') input: UserInput) {
        return await this.userService.login(input);
    }

}
