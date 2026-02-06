import client from '../../shared/db/db';
import { Request, Response } from 'express';

/**
* Handles user current balance.
 * @param req Request object
 * @param res Response object
 */
export const getBalance = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        // Sum confirmed transactions for this user
        const result = await client.query(
            `
                SELECT COALESCE(SUM(amount), 0) AS balance
                FROM transactions
                WHERE target_type = 'user' 
                    AND target_id = $1
                    AND status = 'confirmed'
            `,
            [userId]
        );

        const balance = Number(result.rows[0].balance)

        res.status(200).json({ 
            message: 'Balance retrieved', 
            balance 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};