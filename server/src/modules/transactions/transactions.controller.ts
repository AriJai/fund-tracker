import client from '../../shared/db/db';
import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { AuthenticatedRequest } from '../auth/auth.types';

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

/**
 * Handles transaction posts.
 * @param req Request object
 * @param res Response object
 */
export const addTransaction = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { target_type, target_id, amount, reason } = req.body;
        
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const creatorUserId = req.user.userId
        
        if (!target_type || !target_id || !amount || amount <= 0) {
            res.status(400).json({ message: 'Invalid input' });
            return;
        }
        // SQL queries
        // const conn = await client.query('BEGIN');

        // Add transaction for the user, include time and date
        const externalId = randomUUID();
        const result = await client.query(
            `
                INSERT INTO transactions (
                    creator_user_id,
                    target_type,
                    target_id,
                    amount,
                    status,
                    confirmed_at,
                    reason,
                    external_id
                )
                VALUES ($1, $2, $3, $4, 'confirmed', NOW(), $5, $6)
                ON CONFLICT (creator_user_id, external_id)
                DO NOTHING
                RETURNING *;
            `,
            [creatorUserId, target_type, target_id, amount, reason, externalId]
        );
        res.status(201).json(result.rows[0]);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ sucess: false, message: `Internal server error` });
    }
};