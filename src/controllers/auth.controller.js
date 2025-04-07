import { User } from '/src/models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import errorHandler from '../utils/errorHandler';
import { NotFoundError, Unauthorized } from '/src/utils/errors';
import config from '/src/config/config.js';

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) throw new NotFoundError('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new NotFoundError('Invalid credentials');

  const token = jwt.sign({ id: user.id, name: user.fullName, role: user.role },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiration,
      algorithm: 'HS512', // default 'HS256' 
      noTimestamp: true // default false - don't include timestamp in the token
    });
  res.cookie('token', token, {
    httpOnly: true,
    expiresIn: config.jwtExpiration
  });
  res.status(200).json({
    id: user.id,
    name: user.fullName,
    token
  });
}

const logout = async (_, res) => {
  res.clearCookie('token');
  res.status(200);
}

const changePassword = async (req, res) => {
  const id = parseInt(req.params.id);
  const { oldPass, newPass, confirm } = req.body;

  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError('User not found');

  const isPasswordValid = await bcrypt.compare(oldPass, user.password);
  if (!isPasswordValid) throw new Unauthorized('Old password does not match');

  if (newPass !== confirm) throw new Unauthorized('New password and confirmation does not match');

  await user.update({ password: newPass });
  res.status(200).json({ message: 'Password updated successfully' });
}

export default {
  login: errorHandler(login),
  logout: errorHandler(logout),
  changePassword: errorHandler(changePassword)
};