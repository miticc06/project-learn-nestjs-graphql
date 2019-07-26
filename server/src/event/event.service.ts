import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { MongoRepository } from 'typeorm';
import { EventInput } from './event.input';
import { UserInputError } from 'apollo-server-core';
import * as uuid from 'uuid';
import { User } from '../user/user.entity';
@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: MongoRepository<Event>
    ) {
    }

    async findAll(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async createEvent(eventInput: EventInput): Promise<Event> {
        if (!eventInput.title || eventInput.title.trim().length === 0) {
            throw new UserInputError('title khong duoc de trong!');
        }

        if (!eventInput.description || eventInput.description.trim().length === 0) {
            throw new UserInputError('description khong duoc de trong!');
        }

        if (!eventInput.price || eventInput.price === 0) {
            throw new UserInputError('price khong duoc de trong!');
        }

        if (!eventInput.date || eventInput.date.trim().length === 0) {
            throw new UserInputError('date khong duoc de trong!');
        }
        let event = new Event();
        event._id = uuid.v4();
        event.title = eventInput.title;
        event.description = eventInput.description;
        event.price = eventInput.price;
        event.date = new Date(eventInput.date).toISOString();
        event.creator = "81fa67d2-a8c6-46ea-9f61-e184a1b8044a";// await this.userRepository.findOne({ _id: "81fa67d2-a8c6-46ea-9f61-e184a1b8044a" }); //"81fa67d2-a8c6-46ea-9f61-e184a1b8044a";
        return this.eventRepository.save(event);

        // return {
        //     _id: event._id,
        //     title: event.title,
        //     description: event.description,
        //     price: event.price,
        //     date: event.date,
        //     creator: new User()
        // };
    }
}
