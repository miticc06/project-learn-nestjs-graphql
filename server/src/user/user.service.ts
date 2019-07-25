import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import { UserInput } from './user.input';
import * as uuid from 'uuid'
import { UserInputError } from 'apollo-server-express'
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>
    ) { }

    async createUser(input: UserInput): Promise<User> {

        if (!input.username || input.username.trim().length === 0) {
            throw new UserInputError('Username khong duoc de trong!');
        }

        if (!input.password || input.password.length === 0) {
            throw new UserInputError('Password khong duoc de trong!');
        }

        const existingUser = await this.userRepository.findOne({ username: input.username.trim() });
        console.log(existingUser);
        if (existingUser) {
            throw new Error('Username da ton tai!');
        }

        const user = new User();
        user._id = uuid.v4();
        user.username = input.username.trim();
        user.password = input.password;

        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    } 


}
