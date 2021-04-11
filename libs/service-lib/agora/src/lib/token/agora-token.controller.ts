import { Body, Controller, Post } from '@nestjs/common';
import { AgoraTokenService } from './agora-token.service';
import { AgoraTokenGenDto } from './dto/agora-token-gen.dto';

@Controller('agora-token')
export class AgoraTokenController {
  constructor(private tk_srv: AgoraTokenService) {}

  @Post()
  async generateToken(@Body() tkDto: AgoraTokenGenDto) {
    return this.tk_srv.generateToken(tkDto);
  }
}
