const { Sequelize, Model } = require('sequelize');
const sequelize = require('../middleware/dataBase');


class User extends Model{}
User.define({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false
  }
}, {
  timestamps: false,
  modelName: 'users',
  sequelize
});

 User.sync()

module.exports = User