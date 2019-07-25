import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, AuthData } from './user.entity';
import { MongoRepository } from 'typeorm';
import { UserInput } from './user.input';
import * as uuid from 'uuid'
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

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
        user.password = await bcrypt.hash(input.password, 12); // mã hóa password
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        const listUsers = await this.userRepository.find();
        return listUsers.map(user => {
            return {
                _id: user._id,
                username: user.username,
                password: null
            }
        });
    }


    async login(input: UserInput): Promise<AuthData> {
        const user = await this.userRepository.findOne({ username: input.username });
        if (!user) {
            throw new AuthenticationError('Wrong Password!');
        }
        const isCorrectPassword = bcrypt.compare(input.password, user.password);
        if (!isCorrectPassword) {
            throw new AuthenticationError('Wrong Password!');
        }


        console.log(process.env.DATABASE_USER);

        // jwt.sign({}, process.env.SECRECT_KEY);

        let authData = new AuthData();
        authData.token = "ahihi";
        authData.userId = "1234";
        return authData;
    }


}
