import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionTest } from './entity/connection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionTest])],
  providers: [ConnectionService, ConnectionResolver],
  exports: [TypeOrmModule],
})
export class ConnectionModule {}
