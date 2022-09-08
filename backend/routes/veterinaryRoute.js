import express from 'express';

const router = express.Router();
import {
  register,
  profile,
  confirm,
  authenticate,
  forgottenPassword,
  verifyToken,
  newPassword,
} from '../controllers/veterinaryController.js';
import checkAuth from '../middleware/authMiddleware.js';

// Public Router
router.post('/register', register);
router.get('/confirm/:token', confirm);
router.post('/login', authenticate);
router.post('/forgotten-password', forgottenPassword);
router.route('/forgotten-password/:token').get(verifyToken).post(newPassword);

// Private Router
router.get('/profile', checkAuth, profile);

export default router;
