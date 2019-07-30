import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { AuthMiddleware } from './auth-middleware/auth-middleware';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true
    }),
    TypeOrmModule.forRoot({
      url: 'mongodb://localhost/project_learn_nestjs_graphql',
      type: 'mongodb',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true
    }),
    UserModule,
    EventModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule { }


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}