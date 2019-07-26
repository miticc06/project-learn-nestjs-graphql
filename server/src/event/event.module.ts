import { Module } from '@nestjs/common';
import { EventResolver } from './event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { User } from '../user/user.entity';

import { EventService } from './event.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    UserModule
  ],
  providers: [
    EventResolver,
    EventService
  ]
})
export class EventModule { }
