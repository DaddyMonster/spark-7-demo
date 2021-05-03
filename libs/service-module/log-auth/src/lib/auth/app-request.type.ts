import { AppSession } from '@hessed/service-lib/exp-session';

interface LogAppUserSession {
  uid: number;
  username: string;
  email: string;
  role: string;
}

export type LogAppReq = AppSession<{ user: LogAppUserSession }>;
