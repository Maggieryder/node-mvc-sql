const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true 
  }
  // products: [
  //   { id: Sequelize.STRING, qty: Sequelize.NUMBER}
  // ]
  // totalprice: {
  //   type: Sequelize.DOUBLE,
  //   allowNull: false
  // }
})

module.exports = Cart;