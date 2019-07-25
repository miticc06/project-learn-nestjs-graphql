import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { MongoRepository } from 'typeorm';
import { EventInput } from './event.input';
import { UserInputError } from 'apollo-server-core';
import * as uuid from 'uuid';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: MongoRepository<Event>
    ) { }

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
        event.creator = "c2f7805d-c9e2-4bfa-9ba4-4b430a376294";
        return this.eventRepository.save(event);
    }
}
