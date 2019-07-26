import { Module } from '@nestjs/common';
import { EventResolver } from './event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    UserModule
  ],
  providers: [
    EventResolver,
    EventService
  ],
  exports: [EventService]
})

export class EventModule { }
