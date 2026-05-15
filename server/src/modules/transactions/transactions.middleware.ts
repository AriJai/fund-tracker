import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate userId parameter
 */
export const validateBalanceParam = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing userId' });
    }

    next();
};

/**
 * Middleware for validating transaction posts.
 */
export const validateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { target_type, target_id, amount, reason } = req.params;
    // Check for type and presense
    if (!target_type || !["user", "team"].includes(target_type)) {
        return res.status(400).json({ error: "Invalid target_type" });
    }
    if (!target_id || typeof target_id !== "number") {
        return res.status(400).json({ error: "Invalid target_id" });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ error: "Amount must be a positive number" });
    }
    if (reason && typeof reason !== "string") {
        return res.status(400).json({ error: "Reason must be a string" });
    }
    // Check amount is below $100K
    if (amount > 99_999_99) {
        return res.status(400).json({ error: "Amount exceeds maximum allowed" });
    }
    // Check reason length
    if (reason?.length > 200) {
        return res.status(400).json({ error: "Reason exceeds maximum length" });
    }
    
    next();
};