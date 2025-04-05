import User from '/src/models/user.model.js';
import errorHandler from '/src/utils/errorHandler.js';

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
}

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError('User not found');
  res.status(200).json(user);
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) throw new NotFoundError('User not found');
  await user.update(req.body);
  res.status(200).json(user);
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) throw new NotFoundError('User not found');
  await user.destroy();
  res.status(204).send();
}

export default {
  createUser: errorHandler(createUser),
  getAllUsers: errorHandler(getAllUsers),
  getUserById: errorHandler(getUserById),
  updateUser: errorHandler(updateUser),
  deleteUser: errorHandler(deleteUser)
};

// {
//   success,
//   message,
//   data
// }