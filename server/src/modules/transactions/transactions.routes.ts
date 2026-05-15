import { Router } from 'express';
import { validateBalanceParam } from './transactions.middleware';
import { addTransaction, getBalance } from './transactions.controller';
import { authenticateJWT } from '../auth/auth.middleware';


const router: Router = Router();

// Balance Route
router.get('/users/:userId/balance', authenticateJWT ,validateBalanceParam, getBalance);

router.post('/', authenticateJWT, addTransaction);

export default router;