import express from 'express';
import userCtrl from '/src/controllers/user.controller.js';
import authMiddleware from '/src/utils/auth.middleware.js';

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.getAllUsers)
  .post(userCtrl.createUser);

router.route('/api/users/:id')
  .get(authMiddleware.verifyToken, userCtrl.getUserById)
  .put(authMiddleware.verifyToken, authMiddleware.hasAccess, userCtrl.updateUser)
  .delete(authMiddleware.verifyToken, authMiddleware.hasAccess, userCtrl.deleteUser);

export default router;