import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate userId parameter
 */
export const validateBalanceParam = (req: Request, res: Response, next: NextFunction) => {
    const { userId }  = req.params;
    
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing userId' });
    }

    next();
};