import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AccessTokenPayload } from '../../modules/auth/auth.types';

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {}