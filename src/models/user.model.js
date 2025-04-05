import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '/src/config/sequelize.js';

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
  },
  {
    tableName: 'users',
    timestamps: true,
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    }
  });

export default User;
