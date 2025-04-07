import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '/src/config/sequelize.js';

const userDto = (user) => {
  const { id, username, firstName, lastName, email, status, role } = user;
  return { id, username, firstName, lastName, email, status, role };
};

const User = sequelize.define('User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() { return `${this.firstName} ${this.lastName}` }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'inactive'
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    resetToken: {
      type: DataTypes.STRING
    },
    resetTokenExpiry: {
      type: DataTypes.DATE
    }
  });

User.addHook('beforeCreate', async user => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.addHook('beforeUpdate', async user => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

export { User, userDto };
