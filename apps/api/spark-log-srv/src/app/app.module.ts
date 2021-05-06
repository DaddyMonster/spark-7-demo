import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConnectionModule } from '../connection/connection.module';
import { ConnectionTest } from '../connection/entity/connection.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { getRedis } from '@hessed/service-lib/redis';
/* import {} from '@hessed/service-lib/auth-util'; */
import { LogAppUser, LogAuthModule } from '@hessed/service-module/log-auth';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: process.env.NODE_ENV !== 'production',
      autoLoadEntities: true,
      logging: process.env.NODE_ENV !== 'production',
      entities: [ConnectionTest, LogAppUser],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'libs/gql/log-app/src/schema/schema.gql'
      ),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      path: `/${process.env.GLOBAL_PREFIX}/graphql`,
      installSubscriptionHandlers: true,
      subscriptions: {
        path: `/${process.env.GLOBAL_PREFIX}/subscription`,
        keepAlive: 1000,
      },
    }),
    ConnectionModule,
    LogAuthModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: () =>
        new RedisPubSub({
          publisher: getRedis(),
          subscriber: getRedis(),
        }),
    },
  ],
})
export class AppModule {}
