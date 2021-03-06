const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true 
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  useremail: {
    type: Sequelize.STRING,
    allowNull: false
  }
  // userpassword: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
})

module.exports = User;