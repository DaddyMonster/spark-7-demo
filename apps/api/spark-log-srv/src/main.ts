/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GLOBAL_PREFIX } from './environments/environment';
import { AppModule } from './app/app.module';
import { appSession } from '@hessed/service-lib/exp-session';
import { CORS_ORIGINS } from './environments/cors-origins.prod';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.use(helmet());
  app.use(csurf());
  app.use(appSession);
  app.use(compression());
  app.enableCors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' ? CORS_ORIGINS : '*',
  });

  const port = process.env.PORT || 5100;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + GLOBAL_PREFIX);
  });
}

bootstrap();
