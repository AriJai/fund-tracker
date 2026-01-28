import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AccessTokenPayload } from '../authTypes';

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {}