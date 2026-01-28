import { Router } from 'express';
import { register, login, logout, getUser } from './auth.controller';
import { authenticateJWT, validateRegister, validateLogin } from './auth.middleware';

const router: Router = Router();

// Registration route
router.post('/register',validateRegister, register);
// Login route
router.post('/login', validateLogin, login);
router.post('/logout', logout)

// User route {protected-route}
// requires authenticateJWT
router.get('/user', authenticateJWT, getUser);


export default router;