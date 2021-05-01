import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GLOBAL_PREFIX } from './constants/prefix';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = process.env.PORT || 5000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + GLOBAL_PREFIX);
  });
}

bootstrap();
