import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AuthMiddleware } from './auth-middleware/auth-middleware';

const port = process.env.PORT || 4000;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // app.use(new AuthMiddleware()); // authen


  await app.listen(port);
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');

}
bootstrap();
