import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { UserInput } from './user.input';
import * as uuid from 'uuid'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>
    ) { }

    async createUser(input: UserInput): Promise<User> {
        const user = new User();
        user._id = uuid.v4();
        user.username = input.username;
        user.password = input.password;
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

}
