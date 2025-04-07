import { User, userDto } from '/src/models/user.model.js';
import errorHandler from '/src/utils/errorHandler.js';
import { NotFoundError } from '/src/utils/errors.js';
import { sendMail } from '/src/utils/mail.service.js';

const createUser = async (req, res) => {
  const user = req.body;
  const data = await User.create({
    ...user,
    resetToken: '1234567890',
    resetTokenExpiry: new Date(Date.now() + 900000)
  });

  const greeting = `
    <h3>Dear ${user.fullName},</h3>
    <p>Thank you for registering!</p>
    <p>Click the link below to verify your email:</p>
    <a href="http://localhost:3000/api/users/verify/${data.resetToken}">Verify Email</a>
  `;
  sendMail(data.email, 'Welcome to identity!', greeting);

  res.status(201).json({ data: userDto(data) });
}

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  const userDtos = users.map(user => userDto(user));
  res.status(200).json({
    data: {
      count: users.length,
      page: 1,
      limit: 10,
      users: userDtos
    }
  });
}

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError('User not found');
  res.status(200).json({ data: userDto(user) });
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) throw new NotFoundError('User not found');
  await user.update(req.body);
  res.status(200).json({ data: userDto(user) });
}

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
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
