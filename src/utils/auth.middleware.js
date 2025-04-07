import jwt from 'jsonwebtoken';
import config from '/src/config/config.js';
import errorHandler from './errorHandler.js';
import { NotLoggedIn, Unauthorized } from './errors';


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) throw new NotLoggedIn('User not authenticated!');

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) throw new Unauthorized('Invalid token!');
    req.userId = decoded.id;
    req.userRole = decoded.role;
  });
  next();
}

const hasAccess = (req, res, next) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.userId);
 
  if (!(req.userRole === 'admin' || userId === id)) {
    throw new Unauthorized('You do not have permission to access this resource!');
  }
  next();
};

export default {
  verifyToken: errorHandler(verifyToken),
  hasAccess: errorHandler(hasAccess)
};
