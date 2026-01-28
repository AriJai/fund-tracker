import bcrypt from 'bcryptjs';
import { CookieOptions, Request, Response } from 'express';
import client from '../db';
import hashPassword from '../utils/hashPassword';
import { signAccessToken } from '../utils/jwt';
import { AuthRequest, AuthResponse, UserRow, AuthenticatedRequest } from '../types/authTypes';

/**
 * Handles user registration.
 * @param req Request object
 * @param res Response object
 */

const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

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
const login = async (
    req: Request<{}, {}, AuthRequest>,
    res: Response<AuthResponse>
): Promise<void> => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const result = await client.query<UserRow>('SELECT id, username, password FROM users WHERE username = $1',
            [username]
        );
        // Cannot find user
        if (result.rows.length === 0) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // Found user
        const user = result.rows[0];
        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Sign JWT
        const token = signAccessToken({
            userId: user.id,
        });

        // Set cookie
        const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
        const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000; // 1 hour
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // 'lax' | 'strict' | 'none'
            maxAge: ACCESS_TOKEN_EXPIRATION,
            path: '/'
        }
        res.cookie(
            ACCESS_TOKEN_COOKIE_NAME,
            token,
            cookieOptions
        );

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
            }
        });
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Handles user logout.
 * @param req Request object
 * @param res Response object
 */
const logout = (req: Request, res: Response) => {
    const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
    const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // 'lax' | 'strict' | 'none'
            path: '/'
        }
    res.clearCookie(
        ACCESS_TOKEN_COOKIE_NAME,
        cookieOptions,
    );
    return res.json({ message: 'Logged out successfully'});
}

/**
 * Handles user authentication.
 * @param req Request object
 * @param res Response object
 */
const getUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // req.user is set by authenticateJWT
        const requser = req.user;

        const userId = requser.userId;

        // Fetch user info from database
        const result = await client.query(
            'SELECT id, username FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result.rows[0];
        return res.json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};


export { register, login, logout, getUser };