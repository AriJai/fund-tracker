import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import client from '../db';
import hashPassword from '../utils/hashPassword';

/**
 * Handles user registration.
 * @param req Request object
 * @param res Response object
 */

const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    // Check for missing Username and Password
    if (!username || !password) {
        res.status(400).json({ message: 'Both Username and password are required' });
        return;
    }

    try {
        // Check if the username already exists in the database
        const result = await client.query('SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (result.rows.length > 0) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Insert the new user into the database
        const insertResult = await client.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );

        const newUser = insertResult.rows[0];

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, username: newUser.username },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Handles user login.
 * @param req Request object
 * @param res Response object
 */
const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    // Check for missing Username and Password
    if (!username || !password) {
        res.status(400).json({ message: 'Both Username and password are required' });
        return;
    }

    try {
        // Find user by username
        const result = await client.query('SELECT * FROM users WHERE username = $1', 
            [username]
        );

        if (result.rows.length === 0) {
            res.status(400).json({ message: 'Invalid username' });
            return;
        }

        const user = result.rows[0];

        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h'}
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { register, login };