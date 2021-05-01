/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GLOBAL_PREFIX } from './environments/environment';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = process.env.PORT || 5100;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + GLOBAL_PREFIX);
  });
}

bootstrap();
