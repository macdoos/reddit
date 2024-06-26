import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';
import { createUpdootLoader } from './utils/createUpdootLoader';

export type MyContext = {
  req: Request & { session: Session };
  redis: Redis;
  res: Response;
  updootLoader: ReturnType<typeof createUpdootLoader>;
}