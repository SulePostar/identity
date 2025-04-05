import express from 'express';
import userCtrl from '/src/controllers/user.controller.js';

const router = express.Router();

router.route('/api/users')
  .get(userCtrl.getAllUsers)
  .post(userCtrl.createUser);

router.route('/api/users/:id')
  .get(userCtrl.getUserById)
  .put(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

export default router;