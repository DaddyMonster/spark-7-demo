import { LogAppReq } from './app-request.type';

export interface GqlContext {
  req: LogAppReq;
  res: Response;
}
