import { Module } from '@nestjs/common';
import { EventResolver } from './event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Event])
  ],
  providers: [EventResolver, EventService]
})
export class EventModule { }
