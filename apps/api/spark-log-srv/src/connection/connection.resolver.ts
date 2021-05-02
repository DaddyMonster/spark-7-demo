import { Resolver, Query, Args } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';
import { EstablishConnectionDTO } from './dto/establish.dto';
import { ConnectionTest } from './entity/connection.entity';

@Resolver(() => ConnectionTest)
export class ConnectionResolver {
  constructor(private connection_srv: ConnectionService) {}

  @Query(() => ConnectionTest)
  async establish(@Args('input') args: EstablishConnectionDTO) {
    return this.connection_srv.establish(args);
  }
}
