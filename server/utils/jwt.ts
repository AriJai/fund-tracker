import jwt from "jsonwebtoken";
import { AccessTokenPayload } from "../types/authTypes";

/**
 * Handles token authentication.
 * @param payload User object
 */
export const signAccessToken  = (payload: AccessTokenPayload): string => {
    if (!payload) throw new Error('Authentication error')
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );
};