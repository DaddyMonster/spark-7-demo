import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstablishConnectionDTO } from './dto/establish.dto';
import { ConnectionTest } from './entity/connection.entity';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(ConnectionTest)
    private connection_repo: Repository<ConnectionTest>
  ) {}

  async establish({ log }: EstablishConnectionDTO): Promise<ConnectionTest> {
    return this.connection_repo.save({ log, connection: true });
  }
}
