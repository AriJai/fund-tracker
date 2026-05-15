import * as express from 'express';

declare global {
  namespace Express {
    interface AuthenticatedUser {
      userId: string;
    }

    interface Request {
      user?: AuthenticatedUser;
    }

  }
}

export {}