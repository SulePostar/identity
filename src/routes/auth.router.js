import express from 'express';
import authCtrl from '/src/controllers/auth.controller.js';
import authMiddleware from '/src/utils/auth.middleware.js';

const router = express.Router();

router.route('/auth/login')
  .post(authCtrl.login);

router.route('/auth/logout')
  .get(authCtrl.logout);

router.route('/auth/set-pass/:id')
  .post(authMiddleware.verifyToken, authMiddleware.hasAccess, authCtrl.changePassword);

export default router;