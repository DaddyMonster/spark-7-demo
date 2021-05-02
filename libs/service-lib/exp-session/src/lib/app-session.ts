import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import { getRedis } from '@hessed/service-lib/redis';

export const RedisStore = connectRedis(session);

const sessionRedis = getRedis();
export const appSession = session({
  name: process.env.COOKIE_NAME,
  store: new RedisStore({
    client: sessionRedis,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 96,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
  rolling: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
});
