import User from '/src/models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import errorHandler from '/src/utils/errorHandler.js';
import { NotFoundError } from '/src/utils/errors.js';
import config from '/src/config/config.js';

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) throw new NotFoundError('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new NotFoundError('Invalid credentials');

  const token = jwt.sign({ id: user.id, name: user.fullName, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiration });
  res.cookie('token', token, {
    httpOnly: true,
    expiresIn: config.jwtExpiration,
    algorithm: 'HS512',  // default 'HS256' 
    notimestamp: true, // default false - don't include timestamp in the token
  });
  res.status(200).json({ 
    id: user.id,
    name: user.fullName,
    token 
  });
}

const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
}

export default {
  login: errorHandler(login),
  logout: errorHandler(logout)
};