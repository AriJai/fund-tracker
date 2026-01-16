import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT and attach user info to request.
 */
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // Attach user info to request for use in other routes
        if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: 'Invalid token payload' });
        }
    });
};

export default authenticateJWT;
