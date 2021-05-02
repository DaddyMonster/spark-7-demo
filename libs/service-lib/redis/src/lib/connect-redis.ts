import * as Redis from 'ioredis';

export const getRedis = () => {
  return new Redis(process.env.REDIS_URI, { password: process.env.REDIS_PW });
};
