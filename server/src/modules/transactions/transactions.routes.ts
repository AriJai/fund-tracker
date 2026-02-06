import { Router } from 'express';
import { validateBalanceParam } from './transactions.middleware';
import { getBalance } from './transactions.controller';
import { authenticateJWT } from '../auth/auth.middleware';


const router: Router = Router();

// Balance Route
router.get('/getbalance/:userId', authenticateJWT ,validateBalanceParam, getBalance);

export default router;