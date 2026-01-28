import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, AuthenticatedRequest, AccessTokenPayload } from '../types/authTypes';

/**
 * Middleware to validate registration credentials
 * @param req Request object
 * @param res Response object
 * @param next 
 */
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Username must be a string and is required' });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Password must be a string and is required' });
  }

  const usernamePattern = /^[a-zA-Z0-9._-]{5,}$/;
  const passwordPattern = /(?=.*[A-Za-z])(?=.*\d)(?=.*[_!@#$\-]).{8,20}/;

  if (!usernamePattern.test(username)) {
    return res.status(400).json({ message: 'Invalid username format' });
  }
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Invalid password format' });
  }

  next();
};

/**
 * Middleware to validate login credentials
 * @param req Request object
 * @param res Response object
 * @param next 
 */
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Both Username and password are required'
    });
  }

  // Type check
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      message: 'Username and password must be strings'
    });
  }

  next();
};

export default validateLogin;

/**
 * Middleware to verify JWT and attach user info to request.
 * @param req 
 * @param res 
 * @param next 
 */
export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AccessTokenPayload;

    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
      return res.status(403).json({ message: 'Invalid token payload' });
    }
    // User is verified
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};