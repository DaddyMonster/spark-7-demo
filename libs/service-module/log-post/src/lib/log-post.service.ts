import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogPostMeta } from './entity/post-meta.entity';
@Injectable()
export class LogPostService {
  constructor(
    @InjectRepository(LogPostMeta)
    private readonly logPost: Repository<LogPostMeta>
  ) {}
}
