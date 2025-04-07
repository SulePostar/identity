import express from 'express';
import sequelize from '/src/config/sequelize.js';
import { User } from '/src/models/user.model.js';

const router = express.Router();

router.route('/api/setup').get(async (req, res) => {
  await sequelize.sync({ force: true }); // Set to true to drop and recreate tables
  await User.create({
    username: 'admin_user',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'admin123',
    status: 'active',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  await User.create({
    username: 'regular_user',
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@example.com',
    password: 'user123',
    status: 'inactive',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return res.status(200).json({
    success: true,
    message: 'Database setup completed successfully',
  });
});

export default router;